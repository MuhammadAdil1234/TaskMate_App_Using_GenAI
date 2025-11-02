import React, { createContext, useContext, useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { v4 as uuidv4 } from 'uuid'; // for unique task IDs

// Task type definition
export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  completed: boolean;
}

// Context interface
interface TaskContextProps {
  pendingTasks: Task[];
  completedTasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

// Main provider
export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  /** Add a new task */
  const addTask = useCallback((task: Omit<Task, 'id'>) => {
    const newTask: Task = { ...task, id: uuidv4() };
    setTasks(prev => [...prev, newTask]);
  }, []);

  /** Toggle task completion */
  const toggleTask = useCallback((id: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }, []);

  /** Delete a task */
  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, []);

  /** Separate pending vs completed for easy access */
  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <TaskContext.Provider
      value={{
        pendingTasks,
        completedTasks,
        addTask,
        toggleTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Hook for consuming context
export const useTasks = (): TaskContextProps => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
