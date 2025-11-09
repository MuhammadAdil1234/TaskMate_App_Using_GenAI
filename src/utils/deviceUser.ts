import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values'; // required for uuid in RN

const USER_ID_KEY = 'TASKMATE_USER_ID';

// Get or create a local unique user ID (one per device)
export const getDeviceUserId = async (): Promise<string> => {
  const existing = await AsyncStorage.getItem(USER_ID_KEY);
  if (existing) return existing;

  const newId = uuidv4();
  await AsyncStorage.setItem(USER_ID_KEY, newId);
  return newId;
};
