import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Colors } from '../constants/Colors';
import { Spacing } from '../constants/Spacing';
import { Typography } from '../constants/Typography';
import { Ionicons } from '@expo/vector-icons';
import { CardGlass } from './CardGlass';
import { t } from '../i18n';

interface BitrateModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (bitrate: string) => void;
  currentBitrate: string;
}

const BITRATES = [
  { label: '96 kbps', value: '96k' },
  { label: '128 kbps', value: '128k' },
  { label: '192 kbps', value: '192k' },
  { label: '320 kbps', value: '320k' },
];

export function BitrateModal({ visible, onClose, onSelect, currentBitrate }: BitrateModalProps) {
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
                <Text style={styles.title}>{t('settings.defaultBitrate')}</Text>
                
                {BITRATES.map((option, index) => (
                  <React.Fragment key={option.value}>
                    <TouchableOpacity 
                      style={[styles.option, currentBitrate === option.value && styles.selectedOption]} 
                      onPress={() => onSelect(option.value)}
                    >
                      <View style={styles.optionContent}>
                        <Ionicons 
                          name="musical-note" 
                          size={20} 
                          color={currentBitrate === option.value ? Colors.dark.primary : Colors.dark.textSecondary} 
                        />
                        <Text style={[styles.optionText, currentBitrate === option.value && styles.selectedText]}>
                          {option.label}
                        </Text>
                      </View>
                      {currentBitrate === option.value && (
                        <Ionicons name="checkmark-circle" size={24} color={Colors.dark.primary} />
                      )}
                    </TouchableOpacity>
                    {index < BITRATES.length - 1 && <View style={styles.divider} />}
                  </React.Fragment>
                ))}
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
    height: Spacing.s,
  },
});
