import React, { memo } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Platform,
  Insets,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import colors from '../utils/Color';

type TaskCardProps = {
  title: string;
  description?: string;
  dueDate?: string;
  completed: boolean;
  onToggle: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  checkboxHitSlop?: Insets;
};

/**
 * TaskCard
 * --------
 * Displays a task item with:
 * - White background, rounded corners, subtle shadow
 * - Gradient circular checkbox (blue→green) when completed
 * - White checkmark in center when completed
 * - Title (bold) + description below
 * - Right-aligned due date
 */
const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  dueDate,
  completed,
  onToggle,
  style,
  testID = 'task-card',
  checkboxHitSlop,
}) => {
  const defaultHitSlop: Insets = { top: 6, right: 6, bottom: 6, left: 6 };

  return (
    <View style={[styles.card, style]} testID={testID}>
      {/* Checkbox */}
      <Pressable
        onPress={onToggle}
        hitSlop={checkboxHitSlop ?? defaultHitSlop}
        accessibilityRole="button"
        accessibilityLabel={
          completed ? 'Mark as incomplete' : 'Mark as complete'
        }
        accessibilityState={{ checked: completed }}
        style={({ pressed }) => [
          styles.checkboxBase,
          pressed && { transform: [{ scale: 0.95 }] },
        ]}
      >
        {completed ? (
          <LinearGradient
            colors={[colors.BLUE, colors.GREEN]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.checkboxGradient}
          >
            <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
              <Path
                d="M5 13l4 4L19 7"
                stroke={colors.WHITE}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </LinearGradient>
        ) : (
          <View style={styles.checkboxEmpty} />
        )}
      </Pressable>

      {/* Text Content */}
      <View style={styles.textBlock}>
        <Text
          style={[styles.title, completed && styles.titleCompleted]}
          numberOfLines={1}
        >
          {title}
        </Text>

        {Boolean(description) && (
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        )}
      </View>

      {/* Due Date */}
      {Boolean(dueDate) && (
        <View style={styles.meta}>
          <Text style={styles.dueDate} numberOfLines={1}>
            {dueDate}
          </Text>
        </View>
      )}
    </View>
  );
};

export default memo(TaskCard);

const RADIUS = 12;
const CHECKBOX_SIZE = 24;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    borderRadius: RADIUS,
    paddingHorizontal: 14,
    paddingVertical: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  checkboxBase: {
    width: CHECKBOX_SIZE,
    height: CHECKBOX_SIZE,
    marginRight: 12,
    borderRadius: CHECKBOX_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxEmpty: {
    width: CHECKBOX_SIZE,
    height: CHECKBOX_SIZE,
    borderRadius: CHECKBOX_SIZE / 2,
    borderWidth: 2,
    borderColor: '#CBD5E1', // gray border
  },
  checkboxGradient: {
    width: CHECKBOX_SIZE,
    height: CHECKBOX_SIZE,
    borderRadius: CHECKBOX_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBlock: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '700',
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: '#64748B',
  },
  description: {
    marginTop: 2,
    color: '#94A3B8',
    fontSize: 13,
  },
  meta: {
    marginLeft: 12,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  dueDate: {
    color: '#94A3B8',
    fontSize: 12,
  },
});
