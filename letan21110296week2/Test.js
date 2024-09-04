import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';

const ApiTestScreen = () => {
  const [message, setMessage] = useState('');

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.245.139:8080/api/test1'); // Thay đổi URL nếu cần
      if (response.ok) {
        const result = await response.json(); // Chuyển đổi phản hồi thành JSON
        setMessage(result.message); // Trích xuất trường message từ phản hồi
      } else {
        setMessage('cc1')
        Alert.alert('Error', 'Failed to fetch data');
      }
    } catch (error) {
        setMessage('cc2')
      Alert.alert('Error', 'An error occurred while fetching data');
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data khi component được mount
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>API Test</Text>
      <Text style={styles.response}>{message}</Text>
      <Button title="Fetch Data" onPress={fetchData} />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  response: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default ApiTestScreen;
