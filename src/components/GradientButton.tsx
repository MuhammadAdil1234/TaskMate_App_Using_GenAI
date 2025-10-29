import React, { useRef } from 'react';
import {
  Text,
  Pressable,
  StyleSheet,
  Animated,
  ViewStyle,
  StyleProp,
  Platform,
  Insets,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../utils/Color';

type GradientButtonProps = {
  /** Button label text */
  title: string;
  /** Callback fired when the button is pressed */
  onPress: () => void;
  /**
   * Optional wrapper style. Use this to override positioning or margins.
   * By default, the button is positioned at the bottom-right corner.
   */
  style?: StyleProp<ViewStyle>;
  /** Optional hitSlop to make the button easier to tap */
  hitSlop?: Insets;
  /** E2E testing identifier */
  testID?: string;
};

/**
 * GradientButton
 * --------------
 * A reusable, wide, rounded button with a smooth blue→green gradient background
 * and centered bold white text. Includes subtle shadow for depth and animated
 * scale feedback when pressed.
 
 */
const GradientButton: React.FC<GradientButtonProps> = ({
  title,
  onPress,
  style,
  hitSlop,
  testID = 'gradient-button',
}) => {
  // Animated scale value for press feedback
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.98,
      useNativeDriver: true,
      friction: 7,
      tension: 150,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 7,
      tension: 150,
    }).start();
  };

  const defaultHitSlop: Insets = { top: 6, right: 6, bottom: 6, left: 6 };

  return (
    <Animated.View style={[styles.shadow, { transform: [{ scale }] }, style]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        accessibilityRole="button"
        accessibilityLabel={title}
        hitSlop={hitSlop ?? defaultHitSlop}
        testID={testID}
        style={styles.pressable}
      >
        {/* Gradient surface: blue → green */}
        <LinearGradient
          colors={[colors.BLUE, colors.GREEN]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.gradient}
        >
          <Text style={styles.text}>{title}</Text>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
};

export default GradientButton;

const RADIUS = 10;

const styles = StyleSheet.create({
  /**
   * Outer shadow wrapper for depth (separate from size/layout).
   * Keep shadow on the container to ensure gradient edges render cleanly.
   */
  shadow: {
    alignSelf: 'stretch', // Wide by default; parent can override via `style`
    borderRadius: RADIUS,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  /** Pressable wrapper to provide proper hitSlop & a11y behavior */
  pressable: {
    borderRadius: RADIUS,
    overflow: 'hidden', // Ensures gradient + ripple (if added) are clipped to radius
  },
  /** Gradient background surface */
  gradient: {
    borderRadius: RADIUS,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  /** Centered, bold, white label text */
  text: {
    color: colors.WHITE,
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },
});
