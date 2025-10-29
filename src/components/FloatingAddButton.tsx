import React, { useMemo } from 'react';
import {
  Pressable,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Platform,
  Insets,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../utils/Color';

type FloatingAddButtonProps = {
  /** Callback fired when the button is pressed */
  onPress: () => void;
  /**
   * Optional wrapper style. Use this to override positioning or margins.
   * By default, the button is positioned at the bottom-right corner.
   */
  style?: StyleProp<ViewStyle>;
  /** Diameter of the circular button (default: 64) */
  size?: number;
  /** Thickness of the “+” icon strokes (default: auto based on size) */
  iconThickness?: number;
  /** Optional hitSlop to make it easier to tap (default provided) */
  hitSlop?: Insets;
  /** Test identifier for E2E tests */
  testID?: string;
};

/**
 * FloatingAddButton
 * -----------------
 * A reusable floating action button with a blue→green gradient and a white "+" icon.
 * - Has cross-platform shadow (iOS shadow + Android elevation).
 * - Positioned bottom-right by default; pass `style` to override.
 * - Uses Pressable for proper feedback and accessibility.
 */
const FloatingAddButton: React.FC<FloatingAddButtonProps> = ({
  onPress,
  style,
  size = 64,
  iconThickness,
  hitSlop,
  testID = 'floating-add-button',
}) => {
  // Derive icon thickness proportional to size if not provided
  const thickness = iconThickness ?? Math.max(3, Math.round(size * 0.12));
  const crossLength = Math.round(size * 0.46); // length of each stroke of "+"
  const borderRadius = size / 2;

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        button: {
          width: size,
          height: size,
          borderRadius,
        },
        gradient: {
          flex: 1,
          borderRadius,
        },
        plusCommon: {
          position: 'absolute',
          backgroundColor: colors.WHITE,
          borderRadius: Math.ceil(thickness / 2),
        },
        plusHorizontal: {
          width: crossLength,
          height: thickness,
          left: (size - crossLength) / 2,
          top: (size - thickness) / 2,
        },
        plusVertical: {
          width: thickness,
          height: crossLength,
          left: (size - thickness) / 2,
          top: (size - crossLength) / 2,
        },
      }),
    [size, borderRadius, thickness, crossLength],
  );

  const defaultHitSlop: Insets = { top: 6, right: 6, bottom: 6, left: 6 };

  return (
    <View style={[styles.wrapper, style]} pointerEvents="box-none">
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel="Add"
        testID={testID}
        hitSlop={hitSlop ?? defaultHitSlop}
        style={({ pressed }) => [
          styles.shadowBase,
          dynamicStyles.button,
          pressed && styles.pressed, // slight pressed feedback
        ]}
        android_ripple={{ borderless: true }}
      >
        {/* Circular gradient surface */}
        <LinearGradient
          style={dynamicStyles.gradient}
          // Gradient: blue → green (top-left to bottom-right)
          colors={[colors.BLUE, colors.GREEN]}
          start={{ x: 0.1, y: 0.1 }}
          end={{ x: 0.9, y: 0.9 }}
        >
          {/* “+” icon composed of two white bars */}
          <View
            style={[dynamicStyles.plusCommon, dynamicStyles.plusHorizontal]}
          />
          <View
            style={[dynamicStyles.plusCommon, dynamicStyles.plusVertical]}
          />
        </LinearGradient>
      </Pressable>
    </View>
  );
};

export default FloatingAddButton;

const styles = StyleSheet.create({
  /**
   * Default positioning — bottom-right corner with safe spacing.
   * Override by passing a custom `style` prop from the parent.
   */
  wrapper: {
    position: 'absolute',
    right: 24,
    bottom: 24,
  },
  /**
   * Cross-platform shadow: elevation on Android, shadow props on iOS.
   * Kept separate from size-dependent styles.
   */
  shadowBase: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  /** Slight visual feedback when pressed */
  pressed: {
    transform: [{ scale: 0.98 }],
  },
});
