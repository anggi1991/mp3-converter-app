import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withRepeat, 
  withTiming, 
  withSequence,
  Easing
} from 'react-native-reanimated';
import { Colors } from '../constants/Colors';
import { Spacing } from '../constants/Spacing';

interface WaveformPlaceholderProps {
  active?: boolean;
}

const Bar = ({ delay, active }: { delay: number, active: boolean }) => {
  const height = useSharedValue(10);

  useEffect(() => {
    if (active) {
      height.value = withRepeat(
        withSequence(
          withTiming(40, { duration: 500 + delay, easing: Easing.ease }),
          withTiming(10, { duration: 500 + delay, easing: Easing.ease })
        ),
        -1,
        true
      );
    } else {
      height.value = withTiming(10);
    }
  }, [active, delay]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  return (
    <Animated.View 
      style={[
        styles.bar, 
        animatedStyle,
        { backgroundColor: active ? Colors.dark.secondary : Colors.dark.textSecondary }
      ]} 
    />
  );
};

export const WaveformPlaceholder: React.FC<WaveformPlaceholderProps> = ({ active = false }) => {
  return (
    <View style={styles.container}>
      {[...Array(10)].map((_, i) => (
        <Bar key={i} delay={i * 100} active={active} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    gap: 4,
  },
  bar: {
    width: 4,
    borderRadius: 2,
  },
});
