import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react';
import type { TaskDoc } from '../firebase/firestoreService';
import {
  listenToTasks,
  addTaskDoc,
  setTaskCompleted,
  deleteTaskDoc,
} from '../firebase/firestoreService';

type Task = TaskDoc & { id: string };

type TaskContextShape = {
  tasks: Task[];
  pendingTasks: Task[];
  completedTasks: Task[];
  addTask: (t: Omit<TaskDoc, 'createdAt'>) => Promise<string>;
  toggleTask: (id: string, completed: boolean) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
};

const TaskContext = createContext<TaskContextShape | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const unsub = listenToTasks(setTasks);
    return () => unsub();
  }, []);

  const addTask = useCallback(async (t: Omit<TaskDoc, 'createdAt'>) => {
    const id = await addTaskDoc(t);
    return id;
  }, []);

  const toggleTask = useCallback(async (id: string, completed: boolean) => {
    await setTaskCompleted(id, completed);
  }, []);

  const deleteTask = useCallback(async (id: string) => {
    await deleteTaskDoc(id);
  }, []);

  const pendingTasks = useMemo(() => tasks.filter(t => !t.completed), [tasks]);
  const completedTasks = useMemo(() => tasks.filter(t => t.completed), [tasks]);

  const value = useMemo(
    () => ({
      tasks,
      pendingTasks,
      completedTasks,
      addTask,
      toggleTask,
      deleteTask,
    }),
    [tasks, pendingTasks, completedTasks, addTask, toggleTask, deleteTask],
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTasks = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTasks must be used within a TaskProvider');
  return ctx;
};
