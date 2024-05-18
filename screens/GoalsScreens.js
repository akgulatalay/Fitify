import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const GoalsScreen = () => {
  const [dailyStepsGoal, setDailyStepsGoal] = useState('');
  const [weeklyStepsGoal, setWeeklyStepsGoal] = useState('');
  const [monthlyStepsGoal, setMonthlyStepsGoal] = useState('');
  const [dailyCalorieGoal, setDailyCalorieGoal] = useState('');
  const [weeklyCalorieGoal, setWeeklyCalorieGoal] = useState('');
  const [monthlyCalorieGoal, setMonthlyCalorieGoal] = useState('');

  const navigation = useNavigation();

  const handleSaveGoals = async () => {
    try {
      const goalsData = {
        dailyStepsGoal,
        weeklyStepsGoal,
        monthlyStepsGoal,
        dailyCalorieGoal,
        weeklyCalorieGoal,
        monthlyCalorieGoal,
      };

      await AsyncStorage.setItem('userGoals', JSON.stringify(goalsData));
      console.log('Goals saved:', goalsData);

      Alert.alert("Goals Saved", "Your goals have been successfully saved.");
      navigation.goBack();
    } catch (error) {
      console.error('Error saving goals:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Steps Goals:</Text>
        <TextInput
          style={styles.input}
          placeholder="Daily Goals"
          keyboardType="number-pad"
          value={dailyStepsGoal}
          onChangeText={(text) => setDailyStepsGoal(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Weekly Goals"
          keyboardType="number-pad"
          value={weeklyStepsGoal}
          onChangeText={(text) => setWeeklyStepsGoal(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Monthly Goals"
          keyboardType="number-pad"
          value={monthlyStepsGoal}
          onChangeText={(text) => setMonthlyStepsGoal(text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Goals of Burned Calories:</Text>
        <TextInput
          style={styles.input}
          placeholder="Daily Goals"
          keyboardType="number-pad"
          value={dailyCalorieGoal}
          onChangeText={(text) => setDailyCalorieGoal(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Weekly Goals"
          keyboardType="number-pad"
          value={weeklyCalorieGoal}
          onChangeText={(text) => setWeeklyCalorieGoal(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Monthly Goals"
          keyboardType="number-pad"
          value={monthlyCalorieGoal}
          onChangeText={(text) => setMonthlyCalorieGoal(text)}
        />
      </View>

      <Button title="Save Goals" onPress={handleSaveGoals} color={"#5BD413"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5BD413',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
});

export default GoalsScreen;
