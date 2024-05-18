import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, Button, Image, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword, GoogleAuthProvider,  signInWithPopup } from 'firebase/auth'; // Firebase Auth'dan signInWithEmailAndPassword fonksiyonunu import edin
import { FIREBASE_AUTH } from '../FirebaseConfig';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const auth = FIREBASE_AUTH;

  const handleLogin = async () => {

    setIsLoading(true);
    try {
      if (!email || !password) {
        throw new Error('Please enter both email and password.');
      }

      // Firebase Authentication ile kullanıcı girişi yapma
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Kullanıcı girişi başarılı ise yönlendirme yap
      navigation.navigate('Mainmenu');
    } catch (error) {
      console.error('Login failed:', error);
      Alert.alert('Login Error', 'Failed to sign in. Please check your credentials and try again.');
    }
  };

  const GoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(FIREBASE_AUTH, provider);
      navigation.navigate('Profile');
    } catch (error) {
      console.error('Error during Google Sign-In:', error);
      Alert.alert('Google Sign-In failed: ' + error.message);
    }
  };
  const handleNavigateToSignUp = () => {
    navigation.navigate('SignupScreen');
  };

  const handleNavigateToForget = () => {
    navigation.navigate('ForgotPasswordScreen');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/pagephoto.png')}
        style={styles.image}
        resizeMode="cover"
        accessibilityLabel="Login screen logo"
      />
      <Text style={styles.title}>Sign In</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#FFFFFF"
        value={email}
        onChangeText={(text) => setEmail(text)}
        color="#FFFFFF"
      />

      <TextInput
        style={styles.input}
        placeholder="Your Password"
        placeholderTextColor="#FFFFFF"
        value={password}
        onChangeText={(text) => setPassword(text)}
        color="#FFFFFF"
        secureTextEntry
      />

      <Button title="Login" onPress={handleLogin} color="#5BD413" />

      <Button title="Sign Up" onPress={handleNavigateToSignUp} style={styles.signUp} color="#5BD413" />

      <Button title="Forgot Password" onPress={handleNavigateToForget} style={styles.forgotPassword} color="#F24822" />

      <Button title="Login With Google" onPress={GoogleSignIn} style={styles.forgotPassword} color="#5D5F95" />

      




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
    backgroundColor: '#007bff',
    color: '#fff',
  },
  forgotPassword: {
    marginTop: 25,
    marginLeft: -230,
    color: '#F24822',
  },
  signUp: {
    marginTop: -17,
    marginLeft: 230,
    color: '#5BD413',
  },
});

export default LoginScreen;
