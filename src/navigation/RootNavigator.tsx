import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import SplashScreen from '../screens/SplashScreen'; // uses your existing SplashScreen
import MainTabNavigator from './MainTabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={SplashEntry} />
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
    </Stack.Navigator>
  );
};

export default RootNavigator;

/**
 * This wrapper lets us reuse your existing SplashScreen component
 * that calls an `onFinish` prop after a delay/animation.
 */
const SplashEntry = ({ navigation }: any) => {
  return (
    <SplashScreen
      onFinish={() => {
        // Replace the stack so the user cannot go back to Splash
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainTabs' }],
        });
      }}
    />
  );
};
