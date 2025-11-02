import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';

import { useTasks } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import colors from '../utils/Color';

const CompletedTasksScreen: React.FC = () => {
  const { completedTasks } = useTasks();

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.listItem}>
      <TaskCard
        title={item.title}
        description={item.description}
        dueDate={item.dueDate}
        completed={true} // always completed here
        // View-only: prevent reversing from this screen
        onToggle={() =>
          Alert.alert('View only', 'Completed tasks cannot be modified here.')
        }
        style={styles.card}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.root}>
      {/* Header summary */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Completed Tasks</Text>
        <Text style={styles.headerCount}>{completedTasks.length}</Text>
      </View>

      <FlatList
        contentContainerStyle={styles.listContent}
        data={completedTasks}
        keyExtractor={item => item.id}
        renderItem={renderItem}
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
  root: { flex: 1, backgroundColor: colors.WHITE },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    color: '#111827',
    fontSize: 18,
    fontWeight: '700',
  },
  headerCount: {
    minWidth: 28,
    textAlign: 'center',
    backgroundColor: '#E5E7EB',
    color: '#111827',
    borderRadius: 999,
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingVertical: 2,
    fontWeight: '700',
  },
  listContent: { paddingHorizontal: 16, paddingBottom: 24, paddingTop: 8 },
  listItem: { paddingVertical: 6 },
  card: { flex: 1 },

  // Empty state
  empty: { alignItems: 'center', marginTop: 48 },
  emptyTitle: { color: '#111827', fontSize: 16, fontWeight: '700' },
  emptySub: { color: '#6B7280', marginTop: 6 },
});
