import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Colors } from '../constants/Colors';
import { Spacing } from '../constants/Spacing';
import { Typography } from '../constants/Typography';
import { Ionicons } from '@expo/vector-icons';
import { CardGlass } from './CardGlass';

interface LanguageModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (lang: 'en' | 'id') => void;
  currentLang: string;
}

export function LanguageModal({ visible, onClose, onSelect, currentLang }: LanguageModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <CardGlass style={styles.content}>
                <Text style={styles.title}>Select Language</Text>
                
                <TouchableOpacity 
                  style={[styles.option, currentLang === 'en' && styles.selectedOption]} 
                  onPress={() => onSelect('en')}
                >
                  <View style={styles.optionContent}>
                    <Text style={styles.flag}>🇺🇸</Text>
                    <Text style={[styles.optionText, currentLang === 'en' && styles.selectedText]}>English</Text>
                  </View>
                  {currentLang === 'en' && (
                    <Ionicons name="checkmark-circle" size={24} color={Colors.dark.primary} />
                  )}
                </TouchableOpacity>

                <View style={styles.divider} />

                <TouchableOpacity 
                  style={[styles.option, currentLang === 'id' && styles.selectedOption]} 
                  onPress={() => onSelect('id')}
                >
                  <View style={styles.optionContent}>
                    <Text style={styles.flag}>🇮🇩</Text>
                    <Text style={[styles.optionText, currentLang === 'id' && styles.selectedText]}>Bahasa Indonesia</Text>
                  </View>
                  {currentLang === 'id' && (
                    <Ionicons name="checkmark-circle" size={24} color={Colors.dark.primary} />
                  )}
                </TouchableOpacity>
              </CardGlass>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.l,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 340,
  },
  content: {
    padding: Spacing.l,
  },
  title: {
    fontSize: Typography.size.l,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: Spacing.l,
    textAlign: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.m,
    borderRadius: Spacing.radius.m,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  selectedOption: {
    backgroundColor: 'rgba(6, 182, 212, 0.15)',
    borderColor: Colors.dark.primary,
    borderWidth: 1,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.m,
  },
  flag: {
    fontSize: 24,
  },
  optionText: {
    fontSize: Typography.size.m,
    color: Colors.dark.text,
    fontWeight: '500',
  },
  selectedText: {
    color: Colors.dark.primary,
    fontWeight: '700',
  },
  divider: {
    height: Spacing.m,
  },
});
