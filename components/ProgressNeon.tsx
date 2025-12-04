import React, { useEffect } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming,
  withRepeat,
  withSequence,
  Easing
} from 'react-native-reanimated';
import { Colors } from '../constants/Colors';
import { Spacing } from '../constants/Spacing';
import { Shadow } from '../constants/Shadow';

interface ProgressNeonProps {
  progress: number; // 0 to 1
  style?: ViewStyle;
  indeterminate?: boolean;
}

export const ProgressNeon: React.FC<ProgressNeonProps> = ({ 
  progress, 
  style,
  indeterminate = false
}) => {
  const width = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (indeterminate) {
      width.value = withRepeat(
        withSequence(
          withTiming(0, { duration: 0 }),
          withTiming(100, { duration: 1500, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      );
    } else {
      width.value = withTiming(progress * 100, { duration: 500 });
    }
  }, [progress, indeterminate]);

  useEffect(() => {
    // Pulse effect for neon glow
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.6, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${width.value}%`,
    opacity: opacity.value,
  }));

  return (
    <View style={[styles.container, style]}>
      <Animated.View style={[styles.bar, animatedStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 6,
    backgroundColor: Colors.dark.surface,
    borderRadius: Spacing.radius.round,
    overflow: 'hidden',
    width: '100%',
  },
  bar: {
    height: '100%',
    backgroundColor: Colors.dark.secondary,
    borderRadius: Spacing.radius.round,
    ...Shadow.glow(Colors.dark.secondary),
  },
});
