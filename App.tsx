import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import { TasksProvider } from './src/context/TaskContext';

const App = () => (
  <TasksProvider>
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  </TasksProvider>
);

export default App;
