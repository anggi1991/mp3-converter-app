import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/Colors';
import { Spacing } from '../constants/Spacing';
import { Typography } from '../constants/Typography';
import { Shadow } from '../constants/Shadow';

interface ButtonPrimaryProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({ 
  title, 
  onPress, 
  style, 
  textStyle,
  icon,
  disabled 
}) => {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      activeOpacity={0.8}
      disabled={disabled}
      style={[styles.container, style, disabled && styles.disabled]}
    >
      <LinearGradient
        colors={disabled ? [Colors.dark.surface, Colors.dark.surface] : Colors.gradients.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {icon && <React.Fragment>{icon}</React.Fragment>}
        <Text style={[styles.text, textStyle, disabled && styles.disabledText]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: Spacing.radius.xl,
    overflow: 'hidden',
    ...Shadow.glow(Colors.dark.primary),
  },
  gradient: {
    paddingVertical: Spacing.m,
    paddingHorizontal: Spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.s,
  },
  text: {
    color: Colors.dark.text,
    fontSize: Typography.size.m,
    fontWeight: '600',
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.7,
    elevation: 0,
    shadowOpacity: 0,
  },
  disabledText: {
    color: Colors.dark.textSecondary,
  }
});
