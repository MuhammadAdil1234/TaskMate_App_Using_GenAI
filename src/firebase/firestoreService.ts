import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type TaskDoc = {
  title: string;
  description?: string;
  dueDate?: string;               
  completed: boolean;
  createdAt: FirebaseFirestoreTypes.Timestamp | null;
};

const tasksCol = firestore().collection('tasks');

/** Realtime subscription to all tasks (newest first) */
export const listenToTasks = (onUpdate: (rows: (TaskDoc & { id: string })[]) => void) => {
  return tasksCol.orderBy('createdAt', 'desc').onSnapshot(snap => {
    const list = snap.docs.map(d => {
      const data = d.data() as TaskDoc;
      return { id: d.id, ...data };
    });
    onUpdate(list);
  });
};

/** Add a new task and return the doc id */
export const addTaskDoc = async (payload: Omit<TaskDoc, 'createdAt'>) => {
  try {
    const ref = await tasksCol.add({
      ...payload,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
    return ref.id;
  } catch (e) {
    console.error('[firestore:addTaskDoc] error:', e);
    throw e; // bubble up to Alert
  }
};


/** Set completed true/false */
export const setTaskCompleted = async (id: string, completed: boolean) => {
  await tasksCol.doc(id).update({ completed });
};

/** Delete a task */
export const deleteTaskDoc = async (id: string) => {
  await tasksCol.doc(id).delete();
};
