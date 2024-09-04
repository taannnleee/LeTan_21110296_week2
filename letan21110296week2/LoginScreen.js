import React, { useState } from 'react';
import { View, TouchableOpacity, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AboutMeScreen from './AboutMeScreen';
import RegisterScreen from './RegisterScreen';

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation(); // Hook điều hướng

  const handleLogin = async () => {
    const loginRequest = {
      phoneNumber: phoneNumber,
      password: password,
    };

    try {
      const response = await fetch('http://192.168.245.139:8080/api/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginRequest),
      });

      const responseData = await response.json();
      if (responseData.status == 200) {
        navigation.navigate('AboutMeScreen');
        Alert.alert('Success', responseData.message || 'Login successful');
     
      } else {
        // Hiển thị thông báo lỗi dựa trên mã trạng thái
        Alert.alert('Error',  'An error occurred.'); 
      }
      
    } catch (error) {
      Alert.alert('Error', 'An error occurred while logging in. Please try again later.');
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign In</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#aaa"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.btn} onPress={handleLogin}>
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.btnText}>Forget Password</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={styles.btnText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  formContainer: {
    width: '90%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
  },
  btn: {
    width: 350,
    height: 50,
    backgroundColor: '#5995fd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
  buttonContainer: {
    marginVertical: 10,
  },
});

export default LoginScreen;
