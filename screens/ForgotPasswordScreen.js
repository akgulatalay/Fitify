import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { sendPasswordResetEmail } from 'firebase/auth'; 

// Import auth from FirebaseConfig (assuming it's set up correctly)
import { FIREBASE_AUTH } from '../FirebaseConfig';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleSendResetRequest = async () => {
    try {
      // Check for empty email
      if (!email) {
        throw new Error('Please enter your email address.');
      }

      await sendPasswordResetEmail(FIREBASE_AUTH, email);

      Alert.alert('Password Reset Email Sent', `Password reset email sent to: ${email}`);
      console.log('Sending password reset email to:', email);
    } catch (error) {
      console.error('Error sending password reset email:', error);
      Alert.alert('Error', 'Failed to send password reset email. Please try again.');
    }
  };

  const handleGoBack = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email address"
        placeholderTextColor="#FFFFFF"
        value={email}
        onChangeText={(text) => setEmail(text)}
        color="#FFFFFF"
        keyboardType="email-address"
      />

      <Button title="Send Reset Link" onPress={handleSendResetRequest} color="#5BD413" />

      <Button title="Go Back" onPress={handleGoBack} color="#5BD413" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#5BD413',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#5BD413',
    marginBottom: 20,
    color: '#FFFFFF',
  },
});

export default ForgotPasswordScreen;
