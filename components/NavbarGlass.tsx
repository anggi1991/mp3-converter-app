import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { Spacing } from '../constants/Spacing';
import { Typography } from '../constants/Typography';
import { Ionicons } from '@expo/vector-icons';

interface NavbarGlassProps {
  title: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
}

export const NavbarGlass: React.FC<NavbarGlassProps> = ({ 
  title, 
  showBack = false,
  rightAction 
}) => {
  const router = useRouter();

  return (
    <BlurView intensity={20} tint="dark" style={styles.container}>
      <View style={styles.content}>
        <View style={styles.left}>
          {showBack && (
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="chevron-back" size={24} color={Colors.dark.text} />
            </TouchableOpacity>
          )}
        </View>
        
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        
        <View style={styles.right}>
          {rightAction}
        </View>
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    paddingTop: Spacing.xxl, // Status bar safe area approximation
    paddingBottom: Spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.m,
    height: 44,
  },
  left: {
    width: 40,
    alignItems: 'flex-start',
  },
  right: {
    width: 40,
    alignItems: 'flex-end',
  },
  title: {
    flex: 1,
    color: Colors.dark.text,
    fontSize: Typography.size.l,
    fontWeight: '600',
    textAlign: 'center',
  },
  backButton: {
    padding: Spacing.xs,
  },
});
