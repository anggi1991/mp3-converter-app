import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { CardGlass } from './CardGlass';
import { ButtonPrimary } from './ButtonPrimary';
import { Colors } from '../constants/Colors';
import { Spacing } from '../constants/Spacing';
import { Typography } from '../constants/Typography';
import { Ionicons } from '@expo/vector-icons';
import { t } from '../i18n';

interface AlertModalProps {
  visible: boolean;
  title: string;
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
  buttons?: {
    text: string;
    onPress: () => void;
    style?: 'default' | 'cancel' | 'destructive';
  }[];
}

export const AlertModal: React.FC<AlertModalProps> = ({
  visible,
  title,
  message,
  type = 'info',
  onClose,
  buttons,
}) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return { name: 'checkmark', color: Colors.dark.success, bg: 'rgba(16, 185, 129, 0.15)' };
      case 'error':
        return { name: 'alert', color: Colors.dark.error, bg: 'rgba(239, 68, 68, 0.15)' };
      case 'warning':
        return { name: 'warning', color: Colors.dark.warning, bg: 'rgba(245, 158, 11, 0.15)' };
      default:
        return { name: 'information', color: Colors.dark.primary, bg: 'rgba(6, 182, 212, 0.15)' };
    }
  };

  const icon = getIcon();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <CardGlass style={styles.card}>
          <View style={styles.content}>
            <View style={[styles.iconContainer, { backgroundColor: icon.bg }]}>
              <Ionicons name={icon.name as any} size={48} color={icon.color} />
            </View>
            
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>

            <View style={styles.buttonContainer}>
              {buttons ? (
                buttons.map((btn, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.button,
                      btn.style === 'cancel' && styles.cancelButton,
                      btn.style === 'destructive' && styles.destructiveButton,
                    ]}
                    onPress={() => {
                      btn.onPress();
                      onClose();
                    }}
                  >
                    <Text style={[
                      styles.buttonText,
                      btn.style === 'cancel' && styles.cancelButtonText,
                      btn.style === 'destructive' && styles.destructiveButtonText,
                    ]}>
                      {btn.text}
                    </Text>
                  </TouchableOpacity>
                ))
              ) : (
                <ButtonPrimary
                  title={t('common.ok')}
                  onPress={onClose}
                  style={{ minWidth: 120 }}
                />
              )}
            </View>
          </View>
        </CardGlass>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.l,
  },
  card: {
    width: '85%',
    maxWidth: 320,
    padding: 0,
    backgroundColor: Colors.dark.surface,
  },
  content: {
    padding: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.l,
    width: '100%',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  title: {
    fontSize: Typography.size.l,
    fontWeight: '700',
    color: Colors.dark.text,
    textAlign: 'center',
    lineHeight: 28,
  },
  message: {
    fontSize: Typography.size.m,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: Spacing.m,
    marginTop: Spacing.s,
    justifyContent: 'center',
    width: '100%',
    flexWrap: 'wrap',
  },
  button: {
    paddingVertical: Spacing.m,
    paddingHorizontal: Spacing.l,
    borderRadius: Spacing.radius.m,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    minWidth: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.dark.text,
    fontWeight: '600',
    fontSize: Typography.size.m,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cancelButtonText: {
    color: Colors.dark.textSecondary,
  },
  destructiveButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
  },
  destructiveButtonText: {
    color: Colors.dark.error,
  },
});
