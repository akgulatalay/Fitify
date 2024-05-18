import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, Button, Image, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // auth modülünü doğru şekilde import edin
import { FIREBASE_AUTH } from '../FirebaseConfig'; // FirebaseConfig.js dosyasından auth nesnesini import edin

const SignupScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

  const handleSignUp = async () => {
    setIsLoading(true); // Set loading indicator to true

    try {
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match.');
      }

      // Firebase Authentication ile kullanıcı oluşturma
      const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      //console.log('Successfully registered:', userCredential.user);

      Alert.alert('Success', 'Successfully registered. Please check your email.');
      navigation.navigate('LoginScreen'); // Kayıt başarılıysa giriş sayfasına yönlendir
    } catch (error) {
      console.error('Sign Up failed:', error);
      Alert.alert('Error', 'Sign Up failed: ' + error.message);
    } finally {
      setIsLoading(false); // Set loading indicator to false
    }
  };

  const handleGoBack = () => {
    navigation.navigate('LoginScreen'); // Geri dönüş için giriş sayfasına yönlendir
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/pagephoto.png')}
        style={styles.image}
        resizeMode="cover"
        accessibilityLabel="Signup screen logo"
      />
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
        placeholderTextColor="#FFFFFF"
        color="#FFFFFF"
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
        placeholderTextColor="#FFFFFF"
        color="#FFFFFF"
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholderTextColor="#FFFFFF"
        color="#FFFFFF"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholderTextColor="#FFFFFF"
        color="#FFFFFF"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        placeholderTextColor="#FFFFFF"
        color="#FFFFFF"
        secureTextEntry
      />

      <Button
        title="Sign Up"
        onPress={handleSignUp}
        style={styles.button}
        color="#5BD413"
        disabled={isLoading}
      />
      <Button
        title="Go Back"
        onPress={handleGoBack}
        style={styles.goBack}
        color="#5BD413"
      />
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
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 30,
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
    marginBottom: 10,
    color: '#FFFFFF',
  },
  button: {
    padding: 10,
  },
  goBack: {
    padding: 10,
    marginTop: 10,
  },
});

export default SignupScreen;
