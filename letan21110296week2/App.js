import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { firebaseConfig } from './firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const App = () => {
  const [data, setData] = useState('');

  const handleSave = async () => {
    if (data) {
      try {
        await addDoc(collection(db, 'yourCollectionName'), { data });
        Alert.alert('Success', 'Data saved successfully!');
        setData('');
      } catch (error) {
        console.error('Error saving data:', error);
        Alert.alert('Error', 'Error saving data. Check console for details.');
      }
    } else {
      Alert.alert('Warning', 'Please enter some data.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.message}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Firebase Hosting Setup Complete</Text>
        <Text style={styles.paragraph}>
          You're seeing this because you've successfully setup Firebase Hosting. Now it's time to go build something extraordinary!
        </Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Save Data to Firestore</Text>
        <TextInput
          style={styles.input}
          value={data}
          onChangeText={setData}
          placeholder="Enter some data"
        />
        <Button title="Save Data" onPress={handleSave} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECEFF1',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  message: {
    backgroundColor: 'white',
    maxWidth: 360,
    padding: 32,
    borderRadius: 3,
    marginBottom: 16,
    alignItems: 'center',
  },
  title: {
    color: '#ffa100',
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '300',
    color: 'rgba(0,0,0,0.6)',
    marginVertical: 16,
  },
  paragraph: {
    lineHeight: 1.4,
    marginVertical: 24,
    fontSize: 14,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: 'white',
    maxWidth: 360,
    padding: 32,
    borderRadius: 3,
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    alignItems: 'center',
  },
  formTitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 3,
  },
});

export default App;
