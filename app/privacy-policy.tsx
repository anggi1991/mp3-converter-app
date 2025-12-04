import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NavbarGlass } from '../components/NavbarGlass';
import { CardGlass } from '../components/CardGlass';
import { Colors } from '../constants/Colors';
import { Spacing } from '../constants/Spacing';
import { Typography } from '../constants/Typography';
import { t } from '../i18n';

export default function PrivacyPolicyScreen() {
  return (
    <View style={styles.container}>
      <NavbarGlass title={t('settings.privacyPolicy')} showBack />
      
      <ScrollView contentContainerStyle={styles.content}>
        <CardGlass style={styles.card}>
          <Text style={styles.title}>{t('privacyPolicy.title')}</Text>
          <Text style={styles.date}>{t('privacyPolicy.date')}</Text>
          
          <Text style={styles.paragraph}>
            {t('privacyPolicy.intro')}
          </Text>

          <Text style={styles.heading}>{t('privacyPolicy.interpretationHeading')}</Text>
          <Text style={styles.paragraph}>
            {t('privacyPolicy.interpretationText')}
          </Text>

          <Text style={styles.heading}>{t('privacyPolicy.collectionHeading')}</Text>
          <Text style={styles.subheading}>{t('privacyPolicy.typesHeading')}</Text>
          
          <Text style={styles.subheading}>{t('privacyPolicy.personalDataHeading')}</Text>
          <Text style={styles.paragraph}>
            {t('privacyPolicy.personalDataText')}
          </Text>

          <Text style={styles.subheading}>{t('privacyPolicy.usageDataHeading')}</Text>
          <Text style={styles.paragraph}>
            {t('privacyPolicy.usageDataText')}
          </Text>

          <Text style={styles.heading}>{t('privacyPolicy.contactHeading')}</Text>
          <Text style={styles.paragraph}>
            {t('privacyPolicy.contactText')}
          </Text>
          <Text style={styles.bullet}>{t('privacyPolicy.contactEmail')}</Text>
        </CardGlass>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  content: {
    padding: Spacing.l,
    paddingTop: Spacing.xxl * 2 + Spacing.m,
  },
  card: {
    padding: Spacing.l,
    gap: Spacing.m,
  },
  title: {
    fontSize: Typography.size.xl,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: Spacing.s,
  },
  date: {
    fontSize: Typography.size.s,
    color: Colors.dark.textSecondary,
    marginBottom: Spacing.m,
  },
  heading: {
    fontSize: Typography.size.l,
    fontWeight: '600',
    color: Colors.dark.text,
    marginTop: Spacing.m,
    marginBottom: Spacing.s,
  },
  subheading: {
    fontSize: Typography.size.m,
    fontWeight: '600',
    color: Colors.dark.text,
    marginTop: Spacing.s,
    marginBottom: Spacing.xs,
  },
  paragraph: {
    fontSize: Typography.size.m,
    color: Colors.dark.textSecondary,
    lineHeight: 24,
  },
  bullet: {
    fontSize: Typography.size.m,
    color: Colors.dark.textSecondary,
    marginLeft: Spacing.m,
    marginTop: Spacing.xs,
  },
});
