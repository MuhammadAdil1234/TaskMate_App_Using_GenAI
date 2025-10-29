import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../utils/Color';

type SplashScreenProps = {
  onFinish?: () => void;
  visibleForMs?: number;
};

const SplashScreen: React.FC<SplashScreenProps> = ({
  onFinish,
  visibleForMs = 1000,
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 750,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 750,
        useNativeDriver: true,
      }),
    ]).start();

    const t = setTimeout(() => {
      onFinish?.();
    }, visibleForMs);

    return () => clearTimeout(t);
  }, [onFinish, opacity, translateY, visibleForMs]);

  return (
    <View style={styles.root}>
      {/* Increased green gradient coverage (weight more to bottom) */}
      <LinearGradient
        colors={[colors.BLUE, colors.GREEN]} // stronger green tone
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.center}>
          <Animated.View
            style={[
              styles.content,
              {
                opacity,
                transform: [{ translateY }],
              },
            ]}
          >
            {/* Horizontal row: TaskMate + Logo */}
            <View style={styles.titleRow}>
              <Image
                source={require('../assets/images/logo.png')}
                style={styles.logoImage}
                resizeMode="contain"
              />
              <Text style={styles.appName}>TaskMate</Text>
            </View>

            <Text style={styles.tagline}>Organize your day with ease.</Text>
          </Animated.View>
        </View>

        <View style={styles.footer} />
      </LinearGradient>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.BLUE,
  },
  gradient: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  content: {
    alignItems: 'center',
  },
  // Horizontal layout for text + logo
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  appName: {
    fontSize: 40,
    fontWeight: 'semibold',
    color: colors.WHITE,
    letterSpacing: 0.5,
  },
  logoImage: {
    width: 52,
    height: 52,
    marginLeft: 10,
  },
  tagline: {
    fontSize: 20,
    color: colors.WHITEMUTED,
    textAlign: 'center',
  },
  footer: {
    height: 40,
  },
});
