import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../FirebaseConfig' // firebaseConfig dosyasını doğru yoldan import ediyoruz
import { doc, getDoc } from 'firebase/firestore';

const ProfileScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(0);

  useEffect(() => {
    const getUserData = async () => {
      const user = FIREBASE_AUTH.currentUser;
      if (!user) {
        return; 
      }

      const userDocRef = doc(FIRESTORE_DB, 'users', user.uid); 
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        setUsername(userData.username);
        setEmail(userData.email);
        setHeight(userData.height);
        setWeight(userData.weight);
      } else {
        console.log('User document not found.');
      }
    };

    getUserData();
  }, []);

  const calculateBmi = () => {
    if (height && weight) {
      const heightInMeters = parseFloat(height) / 100; 
      const weightInKg = parseFloat(weight);
      const bmiValue = weightInKg / (heightInMeters * heightInMeters);
      setBmi(bmiValue.toFixed(2)); 
    } else {
      setBmi(0);
    }
  };

  
  const handleLogout = () => {
    
    setUsername('');
    setEmail('');
    FIREBASE_AUTH.signOut();

   
    navigation.navigate('LoginScreen');
  };

  const handleGoBack = () => {

    navigation.goBack();
  };

  const handleResetPassword = () => {

    navigation.navigate("ChangePassword");
  };

  const handleProgressScreen = () => {

    navigation.navigate("ProgressScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        
        <Text style={styles.profileName}>{username}</Text>
      </View>

      <View style={styles.profileInfo}>
        <Text style={styles.profileLabel}>Username:</Text>
        <Text style={styles.profileValue}>{username}</Text>

        <Text style={styles.profileLabel}>Email:</Text>
        <Text style={styles.profileValue}>{email}</Text>
      </View>

      <View style={styles.bmiInput}>
        <TextInput
          style={styles.inputField}
          placeholder="Height (cm)"
          placeholderTextColor="#FFFFFF"
          keyboardType="number-pad"
          value={height}
          onChangeText={(text) => setHeight(text)}
        />

        <TextInput
          style={styles.inputField}
          placeholder="Weight (kg)"
          placeholderTextColor="#FFFFFF"
          keyboardType="number-pad"
          value={weight}
          onChangeText={(text) => setWeight(text)}
        />

        <TouchableOpacity style={styles.calculateButton} onPress={calculateBmi}>
          <Text style={styles.calculateButtonText}>Calculate</Text>
        </TouchableOpacity>

        <Text style={styles.bmiLabel}>BMI:</Text>
        <Text style={[styles.bmiValue, { fontWeight: 'bold', fontSize: 18 }]}>{bmi}</Text>
      </View>

      

      <Button title="Go Back" onPress={handleGoBack} style={styles.button} color={"green"}/>

      <Button title="Reset Password" onPress={handleResetPassword} style={styles.button} />

      <Button title="Progress Screen" onPress={handleProgressScreen} style={styles.button} color={"#A2BC8D"} />


      <View style={styles.logoutButtonContainer}>
        <TouchableOpacity style={[styles.logoutButton, { borderWidth: 2, borderColor: 'red' }]} onPress={handleLogout}>
          <Text style={[styles.logoutButtonText, { fontWeight: 'bold', color: 'red' }]}>Log out</Text>
        </TouchableOpacity>
      </View>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1E1E1E",
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#FFFFFF",
    textAlign: "center",
  },
  profileInfo: {
    marginBottom: 20,
  },
  profileLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FFFFFF',
  },
  profileValue: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  bmiInput: {
    marginBottom: 20,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#5BD413',
    padding: 10,
    marginBottom: 5,
    color: '#FFFFFF',
  },
  calculateButton: {
    backgroundColor: '#5BD413',
    padding: 10,
    borderRadius: 5,
  },
  calculateButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  bmiLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  bmiValue: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  logoutButtonContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 40,
  },

  goBackButton: {
    
    marginTop: 50,
  },

  logoutButton: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'red',
  },
  logoutButtonText: {
    color: 'red',
    fontWeight: 'bold',
  },

  button: {
    padding: 10,
    backgroundColor: '#007bff',
    color: '#fff',
  },
});

export default ProfileScreen;
