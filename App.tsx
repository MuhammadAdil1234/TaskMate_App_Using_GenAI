import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SplashScreen from './src/screens/SplashScreen';
import DynamicInput from './src/components/DynamicInput';

const App = () => {
  // Simple placeholder "navigation" to demonstrate transition after the splash.
  const [showSplash, setShowSplash] = useState(true);
  const [done, setDone] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

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
      <DynamicInput
        label="Task Title"
        type="text"
        placeholder="e.g. Submit assignment"
        value={title}
        onChange={setTitle}
      />

      <DynamicInput
        label="Description"
        type="textarea"
        placeholder="Add more details..."
        value={description}
        onChange={setDescription}
        style={{ marginTop: 16 }}
      />

      <DynamicInput
        label="Due Date"
        type="date"
        placeholder="Select due date"
        value={dueDate}
        onChange={setDueDate}
        style={{ marginTop: 16 }}
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
