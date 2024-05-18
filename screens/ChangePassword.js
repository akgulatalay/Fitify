import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';

const ChangePassword = ({navigation}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reEnterNewPassword, setReEnterNewPassword] = useState('');

  const handleSubmit = async () => {
    const user = FIREBASE_AUTH.currentUser;

    if (newPassword !== reEnterNewPassword) {
      Alert.alert('New passwords do not match!');
      return;
    }

    if (user) {
      try {
        const credential = EmailAuthProvider.credential(user.email, oldPassword);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
        Alert.alert('Password updated successfully!');
        navigation.navigate("ProfileScreen");
        
      } catch (error) {
        console.error('Error updating password:', error);
        Alert.alert('Failed to update password. Please check your old password and try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Şifre Değiştir</Text>

      <TextInput
        style={styles.input}
        placeholder="Old Password"
        secureTextEntry
        value={oldPassword}
        onChangeText={setOldPassword}
        color="#FFFFFF"
      />

      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
        color="#FFFFFF"
      />

      <TextInput
        style={styles.input}
        placeholder="Submit Your New Password"
        secureTextEntry
        value={reEnterNewPassword}
        onChangeText={setReEnterNewPassword}
        color="#FFFFFF"
      />

      <Button title="Send it" onPress={handleSubmit} style={styles.button} color={"#5BD413"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1E1E1E',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: "#FFF",
    marginTop: 200,
    alignItems: "center",
    textAlign: "center",
  },
  input: {
    height: 40,
    margin: 10,
    padding: 10,
    borderColor: '#5BD413',
    borderWidth: 1,
    placeholderTextColor:"#FFFFFF",
    
  },
  button: {
    padding: 10,
    backgroundColor: '#5BD413',
  },
});

export default ChangePassword;
