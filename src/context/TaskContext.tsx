import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

export type Task = {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  completed: boolean;
};

type TasksContextValue = {
  tasks: Task[];
  pendingTasks: Task[];
  completedTasks: Task[];
  addTask: (t: Omit<Task, 'id'>) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
};

const TasksContext = createContext<TasksContextValue | null>(null);

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Design the new homepage',
      description: 'Wireframe and mockup in Figma',
      completed: false,
    },
    {
      id: '2',
      title: 'Finalize Q2 Budget',
      description: 'Review with finance team',
      completed: true,
    },
  ]);

  const addTask = useCallback((t: Omit<Task, 'id'>) => {
    setTasks(prev => [{ ...t, id: `${Date.now()}` }, ...prev]);
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
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

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};

export const useTasks = () => {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error('useTasks must be used within a TasksProvider');
  return ctx;
};
