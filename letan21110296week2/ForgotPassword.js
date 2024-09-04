import React, { useState } from 'react';
import { View, TouchableOpacity, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation(); // Hook for navigation

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }

    try {
      // Append email as a query parameter
      const response = await fetch(`http://192.168.245.139:8080/api/otp?email=${encodeURIComponent(email)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const responseData = await response.json();
      console.log('Response:', response);
      console.log('Response Data:', responseData);

      if (responseData.status == 200) {
        Alert.alert('Success', responseData.message );
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', responseData.message );
      }

    } catch (error) {
      Alert.alert('Error', 'An error occurred while sending OTP. Please try again later.');
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>OTP</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.btn} onPress={handleForgotPassword}>
            <Text style={styles.btnText}>Confirm</Text>
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

export default ForgotPassword;
