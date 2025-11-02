import React, { useRef } from 'react';
import { StyleSheet, Pressable, Animated, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Trash2 } from 'lucide-react-native';

type Props = {
  /** Main content (e.g., <TaskCard />) */
  children: React.ReactNode;
  /** Called when the red delete button is pressed */
  onDelete: () => void;
};

const SwipeableTaskRow: React.FC<Props> = ({ children, onDelete }) => {
  const ref = useRef<Swipeable>(null);

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
  ) => {
    const translate = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [0, 20],
      extrapolate: 'clamp',
    });

    const opacity = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0.2, 1],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={[styles.actionContainer, { opacity }]}>
        <Animated.View style={{ transform: [{ translateX: translate }] }}>
          <Pressable
            onPress={() => {
              ref.current?.close();
              onDelete();
            }}
            style={({ pressed }) => [
              styles.deleteBtn,
              pressed && { opacity: 0.85 },
            ]}
            accessibilityRole="button"
            accessibilityLabel="Delete task"
          >
            <Trash2 size={18} color="#fff" />
          </Pressable>
        </Animated.View>
      </Animated.View>
    );
  };

  return (
    <Swipeable
      ref={ref}
      friction={2}
      rightThreshold={32}
      renderRightActions={renderRightActions}
      overshootRight={false}
      enableTrackpadTwoFingerGesture
    >
      <View style={styles.row}>{children}</View>
    </Swipeable>
  );
};

export default SwipeableTaskRow;

const styles = StyleSheet.create({
  row: {
    backgroundColor: 'transparent',
  },
  actionContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  deleteBtn: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 0,
    marginVertical: 6,
  },
});
