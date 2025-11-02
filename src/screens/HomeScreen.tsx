import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Modal,
  Alert,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Clock } from 'lucide-react-native';

import { useTasks } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import FloatingAddButton from '../components/FloatingAddButton';
import GradientButton from '../components/GradientButton';
import SwipeableTaskRow from '../components/SwipeableTaskRow';
import DynamicInput from '../components/DynamicInput';
import colors from '../utils/Color';

const COMMIT_DELAY_MS = 1200; // how long the tick stays visible before committing

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { pendingTasks, addTask, toggleTask, deleteTask } = useTasks();

  // Create task modal form state
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState('');

  /**
   * Optimistic completion:
   * - optimisticCompleted keeps ids visually "completed" before real commit
   * - timers map stores the pending commit timeout for each id
   */
  const [optimisticCompleted, setOptimisticCompleted] = useState<Set<string>>(
    new Set(),
  );
  const timersRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  // Header with clock icon → Completed screen
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'TaskMate',
      headerRight: () => (
        <Pressable
          onPress={() => navigation.navigate('Completed')}
          hitSlop={8}
          style={({ pressed }) => pressed && { opacity: 0.6 }}
          accessibilityRole="button"
          accessibilityLabel="Open completed tasks"
        >
          <Clock size={22} color="#111" />
        </Pressable>
      ),
    });
  }, [navigation]);

  const openCreate = useCallback(() => {
    setTitle('');
    setDesc('');
    setDate('');
    setModalVisible(true);
  }, []);

  const saveTask = useCallback(() => {
    if (!title.trim()) {
      Alert.alert('Title required', 'Please enter a task title.');
      return;
    }
    addTask({
      title: title.trim(),
      description: desc.trim() || undefined,
      dueDate: date || undefined,
      completed: false,
    });
    setModalVisible(false);
  }, [title, desc, date, addTask]);

  /**
   * Handle checkbox tap with optimistic UI + per-item commit timers.
   * - First tap: show tick immediately, start timer to commit.
   * - Second tap within the window: cancel timer and un-tick (stay pending).
   */
  const handleToggleOptimistic = useCallback(
    (task: { id: string; completed: boolean }) => {
      const id = task.id;

      // If this task is already in optimistic state, cancel it (un-tick).
      if (optimisticCompleted.has(id)) {
        // Clear the pending timer and revert UI
        const t = timersRef.current[id];
        if (t) {
          clearTimeout(t);
          delete timersRef.current[id];
        }
        setOptimisticCompleted(prev => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
        return;
      }

      // If it's already completed in data (edge case), treat as normal toggle
      if (task.completed) {
        toggleTask(id);
        return;
      }

      // Otherwise: mark optimistic & start commit timer
      setOptimisticCompleted(prev => new Set(prev).add(id));

      timersRef.current[id] = setTimeout(() => {
        // Commit the state to the store (this moves it to Completed list)
        toggleTask(id);
        // Clean local tracking
        setOptimisticCompleted(prev => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
        delete timersRef.current[id];
      }, COMMIT_DELAY_MS);
    },
    [optimisticCompleted, toggleTask],
  );

  const renderItem = ({ item }: { item: any }) => {
    // Show the tick if either backend says completed OR optimistic flag is set
    const showCompleted = item.completed || optimisticCompleted.has(item.id);

    return (
      <View style={styles.listItem}>
        <SwipeableTaskRow onDelete={() => deleteTask(item.id)}>
          <TaskCard
            title={item.title}
            description={item.description}
            dueDate={item.dueDate}
            completed={showCompleted}
            onToggle={() => handleToggleOptimistic(item)}
            style={styles.card}
          />
        </SwipeableTaskRow>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={pendingTasks}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        // Rerender when optimistic set changes so ticks reflect immediately
        extraData={optimisticCompleted}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No pending tasks</Text>
            <Text style={styles.emptySub}>Tap the + to add your first one</Text>
          </View>
        }
      />

      {/* Floating + button → open create task modal */}
      <FloatingAddButton onPress={openCreate} />

      {/* Create Task Modal (bottom sheet style) */}
      <Modal
        transparent
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.sheet}>
            <View style={styles.grabber} />

            <DynamicInput
              label="Task Title"
              type="text"
              placeholder="e.g. Assignment Submit today"
              value={title}
              onChange={setTitle}
              style={styles.field}
            />

            <DynamicInput
              label="Description"
              type="textarea"
              placeholder="Add more details…"
              value={desc}
              onChange={setDesc}
              style={styles.field}
            />

            <DynamicInput
              label="Due Date"
              type="date"
              placeholder="Pick a due date"
              value={date}
              onChange={setDate}
              style={styles.field}
            />

            <GradientButton
              title="Save Task"
              onPress={saveTask}
              style={{ marginTop: 14 }}
            />
            <Pressable
              onPress={() => setModalVisible(false)}
              style={styles.cancelBtn}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.WHITE },
  listContent: { padding: 16, paddingBottom: 120 },
  listItem: { paddingVertical: 6 },
  card: { flex: 1 },

  // Empty state
  empty: { alignItems: 'center', marginTop: 48 },
  emptyTitle: { color: '#111827', fontSize: 16, fontWeight: '700' },
  emptySub: { color: '#6B7280', marginTop: 6 },

  // Modal sheet
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#111827',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
  },
  grabber: {
    alignSelf: 'center',
    width: 44,
    height: 5,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 12,
  },
  field: { marginTop: 12 },
  cancelBtn: { alignSelf: 'center', marginTop: 10, padding: 8 },
  cancelText: { color: 'rgba(255,255,255,0.85)', fontSize: 15 },

  // Platform shadows for any future buttons, if needed
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
      },
      android: { elevation: 3 },
    }),
  },
});
