import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SplashScreen from './src/screens/SplashScreen';
import FloatingAddButton from './src/components/FloatingAddButton';
import GradientButton from './src/components/GradientButton';
import TaskCard from './src/components/TaskCard';

const App = () => {
  // Simple placeholder "navigation" to demonstrate transition after the splash.
  const [showSplash, setShowSplash] = useState(true);
  const [done, setDone] = useState(false);

  if (showSplash) {
    return (
      <SplashScreen
        // After the animation + delay, this callback will fire
        onFinish={() => setShowSplash(false)}
      />
    );
  }

  // ⬇️ Replace this section with your actual main navigator/screens.
  return (
    <View style={styles.container}>
      <View style={styles.main}></View>
      <TaskCard
        title="Design the new homepage"
        description="Wireframe and mockup in Figma"
        dueDate="Due: Oct 31"
        completed={done}
        onToggle={() => setDone(prev => !prev)}
        style={{ marginHorizontal: 16, marginVertical: 8 }}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'FFFFFF',
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#D1D5DB',
  },
});
