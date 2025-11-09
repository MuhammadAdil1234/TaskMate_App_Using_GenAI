// import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

// export type TaskDoc = {
//   title: string;
//   description?: string;
//   dueDate?: string;               
//   completed: boolean;
//   createdAt: FirebaseFirestoreTypes.Timestamp | null;
// };

// const tasksCol = firestore().collection('tasks');

// /** Realtime subscription to all tasks (newest first) */
// export const listenToTasks = (onUpdate: (rows: (TaskDoc & { id: string })[]) => void) => {
//   return tasksCol.orderBy('createdAt', 'desc').onSnapshot(snap => {
//     const list = snap.docs.map(d => {
//       const data = d.data() as TaskDoc;
//       return { id: d.id, ...data };
//     });
//     onUpdate(list);
//   });
// };

// /** Add a new task and return the doc id */
// export const addTaskDoc = async (payload: Omit<TaskDoc, 'createdAt'>) => {
//   try {
//     const ref = await tasksCol.add({
//       ...payload,
//       createdAt: firestore.FieldValue.serverTimestamp(),
//     });
//     return ref.id;
//   } catch (e) {
//     console.error('[firestore:addTaskDoc] error:', e);
//     throw e; // bubble up to Alert
//   }
// };


// /** Set completed true/false */
// export const setTaskCompleted = async (id: string, completed: boolean) => {
//   await tasksCol.doc(id).update({ completed });
// };

// /** Delete a task */
// export const deleteTaskDoc = async (id: string) => {
//   await tasksCol.doc(id).delete();
// };

import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values'; // required for uuid in RN

export type TaskDoc = {
  title: string;
  description?: string;
  dueDate?: string;
  completed: boolean;
  createdAt: FirebaseFirestoreTypes.Timestamp | null;
};

const USER_ID_KEY = 'TASKMATE_USER_ID';

// ✅ Ensure every device has a unique local user ID
const getDeviceUserId = async (): Promise<string> => {
  const existing = await AsyncStorage.getItem(USER_ID_KEY);
  if (existing) return existing;

  const newId = uuidv4();
  await AsyncStorage.setItem(USER_ID_KEY, newId);
  return newId;
};

// ✅ Get per-user Firestore collection
const getUserTasksCol = async () => {
  const uid = await getDeviceUserId();
  return firestore().collection('users').doc(uid).collection('tasks');
};

/** Realtime subscription to this user's tasks (newest first) */
export const listenToTasks = async (
  onUpdate: (rows: (TaskDoc & { id: string })[]) => void
) => {
  const tasksCol = await getUserTasksCol();
  return tasksCol.orderBy('createdAt', 'desc').onSnapshot(snap => {
    const list = snap.docs.map(d => {
      const data = d.data() as TaskDoc;
      return { id: d.id, ...data };
    });
    onUpdate(list);
  });
};

/** Add a new task for this device/user */
export const addTaskDoc = async (payload: Omit<TaskDoc, 'createdAt'>) => {
  try {
    const tasksCol = await getUserTasksCol();
    const ref = await tasksCol.add({
      ...payload,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
    return ref.id;
  } catch (e) {
    console.error('[firestore:addTaskDoc] error:', e);
    throw e;
  }
};

/** Set completed true/false */
export const setTaskCompleted = async (id: string, completed: boolean) => {
  const tasksCol = await getUserTasksCol();
  await tasksCol.doc(id).update({ completed });
};

/** Delete a task */
export const deleteTaskDoc = async (id: string) => {
  const tasksCol = await getUserTasksCol();
  await tasksCol.doc(id).delete();
};

