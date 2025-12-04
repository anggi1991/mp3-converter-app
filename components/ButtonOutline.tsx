import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '../constants/Colors';
import { Spacing } from '../constants/Spacing';
import { Typography } from '../constants/Typography';

interface ButtonOutlineProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const ButtonOutline: React.FC<ButtonOutlineProps> = ({ 
  title, 
  onPress, 
  style, 
  textStyle,
  icon
}) => {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      activeOpacity={0.7}
      style={[styles.container, style]}
    >
      {icon && <React.Fragment>{icon}</React.Fragment>}
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: Spacing.radius.xl,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    paddingVertical: Spacing.m,
    paddingHorizontal: Spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.s,
    backgroundColor: 'transparent',
  },
  text: {
    color: Colors.dark.text,
    fontSize: Typography.size.m,
    fontWeight: '500',
    textAlign: 'center',
  },
});
