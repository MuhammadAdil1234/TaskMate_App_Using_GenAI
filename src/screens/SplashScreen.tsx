import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import colors from '../utils/Color';

type SplashScreenProps = {
  /** How long to keep the splash visible before navigating */
  visibleForMs?: number;
};

const SplashScreen: React.FC<SplashScreenProps> = ({ visibleForMs = 1000 }) => {
  const navigation = useNavigation<any>();

  // Simple fade + slide-up animation
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(8)).current;

  useEffect(() => {
    // Start entrance animation
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

    // Navigate to Home after delay
    const t = setTimeout(() => {
      // Replace so user can't go back to Splash
      navigation.replace('Home');
    }, visibleForMs);

    return () => clearTimeout(t);
  }, [navigation, opacity, translateY, visibleForMs]);

  return (
    <View style={styles.root}>
      {/* Gradient: top blue → bottom greener */}
      <LinearGradient
        colors={[colors.BLUE, colors.GREEN]}
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
            {/* Row: App name with logo on the right */}
            <View style={styles.titleRow}>
              <Text style={styles.appName}>TaskMate</Text>
              <Image
                source={require('../assets/images/logo.png')}
                style={styles.logoImage}
                resizeMode="contain"
              />
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
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    gap: 10,
  },
  appName: {
    fontSize: 40,
    // RN doesn't support 'semibold' keyword—use numeric weight
    fontWeight: '700',
    color: colors.WHITE,
    letterSpacing: 0.5,
  },
  logoImage: {
    width: 52,
    height: 52,
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
