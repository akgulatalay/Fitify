import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProgressScreen = ({ navigation }) => {
  const [dailySteps, setDailySteps] = useState('');
  const [dailyCalories, setDailyCalories] = useState('');
  const [goals, setGoals] = useState({
    dailyStepsGoal: 0,
    weeklyStepsGoal: 0,
    monthlyStepsGoal: 0,
    dailyCalorieGoal: 0,
    weeklyCalorieGoal: 0,
    monthlyCalorieGoal: 0
  });
  const [remainingGoals, setRemainingGoals] = useState(goals);

  useEffect(() => {
    const loadGoals = async () => {
      try {
        const savedGoals = await AsyncStorage.getItem('userGoals');
        if (savedGoals) {
          const parsedGoals = JSON.parse(savedGoals);
          setGoals(parsedGoals);
          setRemainingGoals(parsedGoals);
        }
      } catch (error) {
        console.error('Error loading goals:', error);
      }
    };

    loadGoals();
  }, []);

  const handleUpdateProgress = async () => {
    const dailyStepsInt = parseInt(dailySteps);
    const dailyCaloriesInt = parseInt(dailyCalories);
    
    const updatedRemainingGoals = {
      dailyStepsGoal: Math.max(goals.dailyStepsGoal - dailyStepsInt, 0),
      weeklyStepsGoal: Math.max(goals.weeklyStepsGoal - dailyStepsInt, 0),
      monthlyStepsGoal: Math.max(goals.monthlyStepsGoal - dailyStepsInt, 0),
      dailyCalorieGoal: Math.max(goals.dailyCalorieGoal - dailyCaloriesInt, 0),
      weeklyCalorieGoal: Math.max(goals.weeklyCalorieGoal - dailyCaloriesInt, 0),
      monthlyCalorieGoal: Math.max(goals.monthlyCalorieGoal - dailyCaloriesInt, 0),
    };

    setRemainingGoals(updatedRemainingGoals);

    try {
      await AsyncStorage.setItem('remainingGoals', JSON.stringify(updatedRemainingGoals));
      await AsyncStorage.setItem('userProgress', JSON.stringify({
        dailyStepsProgress: dailyStepsInt,
        dailyCalorieProgress: dailyCaloriesInt,
        // Add weekly and monthly progress here if needed
      }));

      Alert.alert("Progress Updated", "Your progress has been successfully updated.");
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const handleGoBack = () => {
    navigation.navigate("ProfileScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progress Tracker</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Daily Steps:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your steps"
          keyboardType="number-pad"
          value={dailySteps}
          onChangeText={(text) => setDailySteps(text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Daily Calories Burned:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter calories burned"
          keyboardType="number-pad"
          value={dailyCalories}
          onChangeText={(text) => setDailyCalories(text)}
        />
      </View>

      <Button title="Update Progress" onPress={handleUpdateProgress} color={"#5BD413"} />

      <Button title="Go Back" onPress={handleGoBack} color={"#5BD413"} />

      <View style={styles.progressGroup}>
        <Text style={styles.progressLabel}>Remaining Daily Steps Goal: {remainingGoals.dailyStepsGoal}</Text>
        <Text style={styles.progressLabel}>Remaining Weekly Steps Goal: {remainingGoals.weeklyStepsGoal}</Text>
        <Text style={styles.progressLabel}>Remaining Monthly Steps Goal: {remainingGoals.monthlyStepsGoal}</Text>
        
        <Text style={styles.progressLabel}>Remaining Daily Calorie Goal: {remainingGoals.dailyCalorieGoal}</Text>
        <Text style={styles.progressLabel}>Remaining Weekly Calorie Goal: {remainingGoals.weeklyCalorieGoal}</Text>
        <Text style={styles.progressLabel}>Remaining Monthly Calorie Goal: {remainingGoals.monthlyCalorieGoal}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5BD413',
    marginBottom: 20,
    marginTop: 170,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5BD413',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
  },
  progressGroup: {
    marginTop: 20,
  },
  progressLabel: {
    fontSize: 16,
    color: '#5BD413',
  },
});

export default ProgressScreen;
