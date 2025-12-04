import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { BlurView } from 'expo-blur';
import { Colors } from '../constants/Colors';
import { Spacing } from '../constants/Spacing';
import { Shadow } from '../constants/Shadow';

interface CardGlassProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  intensity?: number;
}

export const CardGlass: React.FC<CardGlassProps> = ({ 
  children, 
  style,
  intensity = 20
}) => {
  return (
    <View style={[styles.container, style]}>
      <BlurView intensity={intensity} tint="dark" style={styles.blur}>
        {children}
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: Spacing.radius.l,
    overflow: 'hidden',
    backgroundColor: 'rgba(30, 41, 59, 0.4)', // Fallback/Tint
    borderColor: Colors.dark.border,
    borderWidth: 1,
    ...Shadow.soft,
  },
  blur: {
    padding: Spacing.m,
  },
});
