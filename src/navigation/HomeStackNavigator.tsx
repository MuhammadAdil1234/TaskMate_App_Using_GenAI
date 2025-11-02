import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import CompletedTasksScreen from '../screens/CompletedTasksScreen';

export type HomeStackParamList = {
  Home: undefined;
  Completed: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'TaskMate' }}
      />
      <Stack.Screen
        name="Completed"
        component={CompletedTasksScreen}
        options={{ title: 'Completed Tasks' }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
