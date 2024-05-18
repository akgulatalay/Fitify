import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const MainMenuScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('Home');
  const [goals, setGoals] = useState({
    dailyStepsGoal: 0,
    weeklyStepsGoal: 0,
    monthlyStepsGoal: 0,
    dailyCalorieGoal: 0,
    weeklyCalorieGoal: 0,
    monthlyCalorieGoal: 0
  });
  const [remainingGoals, setRemainingGoals] = useState(goals);
  const [progress, setProgress] = useState({
    dailyStepsProgress: 0,
    weeklyStepsProgress: 0,
    monthlyStepsProgress: 0,
    dailyCalorieProgress: 0,
    weeklyCalorieProgress: 0,
    monthlyCalorieProgress: 0
  });

  useFocusEffect(
    React.useCallback(() => {
      const loadGoalsAndProgress = async () => {
        try {
          const savedGoals = await AsyncStorage.getItem('userGoals');
          if (savedGoals) {
            setGoals(JSON.parse(savedGoals));
          }

          const savedRemainingGoals = await AsyncStorage.getItem('remainingGoals');
          if (savedRemainingGoals) {
            setRemainingGoals(JSON.parse(savedRemainingGoals));
          }

          const savedProgress = await AsyncStorage.getItem('userProgress');
          if (savedProgress) {
            setProgress(JSON.parse(savedProgress));
          }
        } catch (error) {
          console.error('Error loading data:', error);
        }
      };

      loadGoalsAndProgress();
    }, [])
  );

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
    if (tab === 'Goals') {
      navigation.navigate('GoalsScreens');
    } else if (tab === 'Profile') {
      navigation.navigate('ProfileScreen');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Goals:</Text>
        <FlatList
          data={[
            { id: '1', title: 'Daily Steps Goal', progress: remainingGoals.dailyStepsGoal },
            { id: '2', title: 'Weekly Steps Goal', progress: remainingGoals.weeklyStepsGoal },
            { id: '3', title: 'Monthly Steps Goal', progress: remainingGoals.monthlyStepsGoal },
            { id: '4', title: 'Daily Burned Calories Goal', progress: remainingGoals.dailyCalorieGoal },
            { id: '5', title: 'Weekly Burned Calories Goal', progress: remainingGoals.weeklyCalorieGoal },
            { id: '6', title: 'Monthly Burned Calories Goal', progress: remainingGoals.monthlyCalorieGoal },
          ]}
          renderItem={({ item }) => (
            <View style={styles.goalItem}>
              <Text style={styles.goalTitle}>{item.title}</Text>
              <Text>{`${item.progress} steps/calories`}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
          style={styles.goalList}
        />
        <Text style={styles.sectionTitle}>Progress:</Text>
        <FlatList
          data={[
            { id: '1', title: ' Steps Progress', value: progress.dailyStepsProgress },
            
            { id: '4', title: ' Burned Calories Progress', value: progress.dailyCalorieProgress },
            
          ]}
          renderItem={({ item }) => (
            <View style={styles.progressItem}>
              <Text style={styles.progressTitle}>{item.title}</Text>
              <Text>{`${item.value} steps/calories`}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
          style={styles.progressList}
        />
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'Home' && styles.selectedTab]}
          onPress={() => handleTabPress('Home')}
        >
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'Goals' && styles.selectedTab]}
          onPress={() => handleTabPress('Goals')}
        >
          <Text style={styles.tabText}>Goals</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'Profile' && styles.selectedTab]}
          onPress={() => handleTabPress('Profile')}
        >
          <Text style={styles.tabText}>Profile</Text>
        </TouchableOpacity>
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
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5BD413',
    marginBottom: 10,
  },
  goalList: {
    marginTop: 10,
  },
  goalItem: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressList: {
    marginTop: 10,
  },
  progressItem: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    paddingBottom: 20,
  },
  tabButton: {
    padding: 10,
    borderRadius: 5,
  },
  tabText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  selectedTab: {
    backgroundColor: '#5BD413',
  },
});

export default MainMenuScreen;
