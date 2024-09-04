import React, { useState } from 'react';
import { View, TouchableOpacity, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation(); // Hook điều hướng

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    const registerRequest = {
      fullname: name,
      phone: phoneNumber,
      email: email,
      password: password,
    };

    try {
      const response = await fetch('http://192.168.245.139:8080/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerRequest),
      });

      const responseData = await response.json();
      if (responseData.status == 200) {
        Alert.alert('Success', responseData.message || 'Registration successful');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', responseData.message || 'An error occurred.');
      }
      
    } catch (error) {
      Alert.alert('Error', 'An error occurred while registering. Please try again later.');
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#aaa"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          placeholderTextColor="#aaa"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.btn} onPress={handleRegister}>
            <Text style={styles.btnText}>Register</Text>
          </TouchableOpacity>
        </View>

        {/* <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.btnText}>Back to Login</Text>
          </TouchableOpacity>
        </View> */}
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

export default RegisterScreen;
