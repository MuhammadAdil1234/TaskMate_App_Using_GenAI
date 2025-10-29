import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SplashScreen from './src/screens/SplashScreen';
import FloatingAddButton from './src/components/FloatingAddButton';

const App = () => {
  // Simple placeholder "navigation" to demonstrate transition after the splash.
  const [showSplash, setShowSplash] = useState(true);

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
      <View style={styles.main}>
        <FloatingAddButton
          onPress={() => {
            /* open create task modal */
          }}
        />
      </View>
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
