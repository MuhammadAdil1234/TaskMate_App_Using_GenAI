import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
} from 'react-native';
import { Trash2, Undo2 } from 'lucide-react-native';
import { useTasks } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';

const CompletedTasksScreen: React.FC = () => {
  const { completedTasks, toggleTask, deleteTask } = useTasks();

  return (
    <SafeAreaView style={styles.root}>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={completedTasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <TaskCard
              title={item.title}
              description={item.description}
              dueDate={item.dueDate}
              completed={item.completed}
              onToggle={() => toggleTask(item.id)} // un-complete
              style={styles.card}
            />
            <Pressable
              style={styles.undoBtn}
              onPress={() => toggleTask(item.id)}
              accessibilityLabel="Move back to pending"
            >
              <Undo2 size={18} color="#fff" />
            </Pressable>
            <Pressable
              style={styles.deleteBtn}
              onPress={() => deleteTask(item.id)}
              accessibilityLabel="Delete task"
            >
              <Trash2 size={18} color="#fff" />
            </Pressable>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No completed tasks</Text>
            <Text style={styles.emptySub}>Finish a task to see it here</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default CompletedTasksScreen;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFFFFF' },
  listContent: { padding: 16 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  card: { flex: 1 },
  undoBtn: {
    marginLeft: 8,
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteBtn: {
    marginLeft: 8,
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: { alignItems: 'center', marginTop: 48 },
  emptyTitle: { color: '#111827', fontSize: 16, fontWeight: '700' },
  emptySub: { color: '#6B7280', marginTop: 6 },
});
