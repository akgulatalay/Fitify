import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import Mainmenu from './screens/MainMenuScreen';
import GoalsScreens from './screens/GoalsScreens';
import ProfileScreen from './screens/ProfileScreen';
import ChangePassword from './screens/ChangePassword';
import ProgressScreen from './screens/ProgressScreen';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LoginScreen' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
        <Stack.Screen name="Mainmenu" component={Mainmenu} />
        <Stack.Screen name="GoalsScreens" component={GoalsScreens} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="ProgressScreen" component={ProgressScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
