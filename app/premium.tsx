import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Spacing } from '../constants/Spacing';
import { Typography } from '../constants/Typography';
import { NavbarGlass } from '../components/NavbarGlass';
import { t } from '../i18n';

const features = [
  { icon: 'close-circle-outline', label: 'premium.noAds', description: 'premium.noAdsDesc' },
  { icon: 'musical-notes-outline', label: 'premium.hqAudio', description: 'premium.hqAudioDesc' },
  { icon: 'flash-outline', label: 'premium.unlimited', description: 'premium.unlimitedDesc' },
  { icon: 'rocket-outline', label: 'premium.fastProcessing', description: 'premium.fastProcessingDesc' },
  { icon: 'shield-checkmark-outline', label: 'premium.support', description: 'premium.supportDesc' },
  { icon: 'star-outline', label: 'premium.exclusive', description: 'premium.exclusiveDesc' },
];

const plans = [
  { id: 'yearly', name: 'premium.yearly', price: '15.000', period: '/tahun', badge: null, discount: null },
  { id: 'lifetime', name: 'premium.lifetime', price: '19.000', period: 'sekali bayar', badge: 'BEST VALUE', discount: 'HEMAT 90%', popular: true },
];

export default function PremiumScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState('lifetime');

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1A1B2E', '#1E1F32', '#2A2B3E']}
        style={styles.background}
      />
      
      {/* Background Effects */}
      <LinearGradient
        colors={['rgba(255, 215, 0, 0.1)', 'transparent']}
        style={[styles.glowEffect, { top: -100, right: -100, width: 300, height: 300 }]}
      />
      <LinearGradient
        colors={['rgba(103, 92, 255, 0.1)', 'transparent']}
        style={[styles.glowEffect, { top: 100, left: -50, width: 250, height: 250 }]}
      />

      <NavbarGlass title={t('premium.title')} showBack />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Hero Section */}
        <View style={styles.hero}>
          <View style={styles.crownContainer}>
            <LinearGradient
              colors={['#FFD700', '#FFA500', '#FF8C00']}
              style={styles.crownBackground}
            >
              <Ionicons name="diamond" size={32} color="white" />
            </LinearGradient>
            <View style={styles.sparkleBadge}>
              <Ionicons name="sparkles" size={16} color="white" />
            </View>
          </View>

          <Text style={styles.heroTitle}>{t('premium.unlockTitle')}</Text>
          <Text style={styles.heroDesc}>{t('premium.unlockDesc')}</Text>
          
          <View style={styles.socialProof}>
            {[1, 2, 3, 4, 5].map((_, i) => (
              <Ionicons key={i} name="star" size={14} color="#FFD700" />
            ))}
            <Text style={styles.socialText}>12,000+ {t('premium.users')}</Text>
          </View>
        </View>

        {/* Features Grid */}
        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>{t('premium.featuresTitle')}</Text>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Ionicons name={feature.icon as any} size={20} color="#FFD700" />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureLabel}>{t(feature.label)}</Text>
                <Text style={styles.featureDesc}>{t(feature.description)}</Text>
              </View>
              <View style={styles.checkIcon}>
                <Ionicons name="checkmark-circle" size={16} color="#22D3EE" />
              </View>
            </View>
          ))}
        </View>

        {/* Pricing Plans */}
        <View style={styles.plansContainer}>
          <Text style={styles.sectionTitle}>{t('premium.choosePlan')}</Text>
          {plans.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              onPress={() => setSelectedPlan(plan.id)}
              activeOpacity={0.9}
              style={[
                styles.planCard,
                selectedPlan === plan.id && styles.selectedPlanCard
              ]}
            >
              {selectedPlan === plan.id && (
                <LinearGradient
                  colors={['rgba(255, 215, 0, 0.1)', 'rgba(255, 165, 0, 0.05)']}
                  style={StyleSheet.absoluteFill}
                />
              )}
              
              {plan.popular && (
                <View style={styles.popularBadge}>
                  <LinearGradient
                    colors={['#22D3EE', '#675CFF']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.badgeGradient}
                  >
                    <Text style={styles.badgeText}>⭐ POPULAR</Text>
                  </LinearGradient>
                </View>
              )}

              {plan.badge && !plan.popular && (
                <View style={styles.valueBadge}>
                  <LinearGradient
                    colors={['#FFD700', '#FFA500']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.badgeGradient}
                  >
                    <Text style={styles.badgeText}>{plan.badge}</Text>
                  </LinearGradient>
                </View>
              )}

              <View style={styles.planContent}>
                <View style={[
                  styles.radioButton,
                  selectedPlan === plan.id && styles.selectedRadio
                ]}>
                  {selectedPlan === plan.id && <View style={styles.radioInner} />}
                </View>

                <View style={styles.planInfo}>
                  <Text style={styles.planName}>{t(plan.name)}</Text>
                  <View style={styles.priceContainer}>
                    <Text style={styles.currency}>Rp</Text>
                    <Text style={styles.price}>{plan.price}</Text>
                    <Text style={styles.period}>{plan.period}</Text>
                  </View>
                  {plan.discount && (
                    <Text style={styles.discountText}>{t('premium.save')} {plan.discount}</Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Subscribe Button */}
        <TouchableOpacity 
          style={styles.subscribeButton}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={['#FFD700', '#FFA500', '#FF8C00']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.subscribeGradient}
          >
            <Ionicons name="diamond" size={24} color="white" style={{ marginRight: 8 }} />
            <Text style={styles.subscribeText}>{t('premium.subscribeNow')}</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Trust Badges */}
        <View style={styles.trustContainer}>
          <View style={styles.trustItem}>
            <Ionicons name="shield-checkmark" size={20} color="#22D3EE" />
            <Text style={styles.trustText}>{t('premium.secure')}</Text>
          </View>
          <View style={styles.trustItem}>
            <Ionicons name="flash" size={20} color="#FFD700" />
            <Text style={styles.trustText}>{t('premium.instant')}</Text>
          </View>
          <View style={styles.trustItem}>
            <Ionicons name="star" size={20} color="#675CFF" />
            <Text style={styles.trustText}>{t('premium.cancel')}</Text>
          </View>
        </View>

        <Text style={styles.termsText}>
          {t('premium.terms')}
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1B2E',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  glowEffect: {
    position: 'absolute',
    borderRadius: 1000,
    opacity: 0.3,
  },
  content: {
    padding: Spacing.m,
    paddingTop: Spacing.xxl * 2 + Spacing.m,
    paddingBottom: Spacing.xl,
  },
  hero: {
    alignItems: 'center',
    marginBottom: Spacing.l,
  },
  crownContainer: {
    position: 'relative',
    marginBottom: Spacing.m,
  },
  crownBackground: {
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  sparkleBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#675CFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#1A1B2E',
  },
  heroTitle: {
    fontSize: Typography.size.l,
    fontWeight: '700',
    color: 'white',
    marginBottom: 4,
    textAlign: 'center',
  },
  heroDesc: {
    fontSize: Typography.size.s,
    color: '#8F90A6',
    textAlign: 'center',
    marginBottom: Spacing.s,
  },
  socialProof: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: Spacing.m,
    paddingVertical: 4,
    borderRadius: Spacing.radius.round,
  },
  socialText: {
    color: '#8F90A6',
    fontSize: 10,
    marginLeft: Spacing.xs,
  },
  featuresContainer: {
    marginBottom: Spacing.l,
    gap: 8,
  },
  sectionTitle: {
    fontSize: Typography.size.m,
    fontWeight: '600',
    color: 'white',
    marginBottom: Spacing.s,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: Spacing.radius.m,
    padding: Spacing.s,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  featureIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.m,
  },
  featureContent: {
    flex: 1,
  },
  featureLabel: {
    color: 'white',
    fontSize: Typography.size.s,
    fontWeight: '600',
    marginBottom: 0,
  },
  featureDesc: {
    color: '#8F90A6',
    fontSize: 10,
  },
  checkIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(34, 211, 238, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plansContainer: {
    marginBottom: Spacing.l,
    gap: Spacing.s,
  },
  planCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: Spacing.radius.l,
    padding: Spacing.m,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    overflow: 'hidden',
  },
  selectedPlanCard: {
    borderColor: '#FFD700',
    backgroundColor: 'rgba(255, 215, 0, 0.05)',
  },
  popularBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderBottomLeftRadius: Spacing.radius.m,
    overflow: 'hidden',
  },
  valueBadge: {
    position: 'absolute',
    top: Spacing.s,
    right: Spacing.s,
    borderRadius: Spacing.radius.round,
    overflow: 'hidden',
  },
  badgeGradient: {
    paddingHorizontal: Spacing.s,
    paddingVertical: 2,
  },
  badgeText: {
    color: 'white',
    fontSize: 9,
    fontWeight: '700',
  },
  planContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.m,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRadio: {
    borderColor: '#FFD700',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFD700',
  },
  planInfo: {
    flex: 1,
  },
  planName: {
    color: 'white',
    fontSize: Typography.size.s,
    fontWeight: '600',
    marginBottom: 2,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  currency: {
    color: '#FFD700',
    fontSize: Typography.size.s,
    fontWeight: '600',
  },
  price: {
    color: '#FFD700',
    fontSize: Typography.size.l,
    fontWeight: '700',
  },
  period: {
    color: '#8F90A6',
    fontSize: 10,
  },
  discountText: {
    color: '#22D3EE',
    fontSize: 10,
    marginTop: 2,
    fontWeight: '600',
  },
  subscribeButton: {
    borderRadius: Spacing.radius.l,
    overflow: 'hidden',
    marginBottom: Spacing.m,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  subscribeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.m,
  },
  subscribeText: {
    color: 'white',
    fontSize: Typography.size.m,
    fontWeight: '700',
  },
  trustContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: Spacing.radius.m,
    padding: Spacing.s,
    marginBottom: Spacing.s,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  trustItem: {
    alignItems: 'center',
    gap: 4,
  },
  trustText: {
    color: '#8F90A6',
    fontSize: 9,
    textAlign: 'center',
  },
  termsText: {
    color: '#8F90A6',
    fontSize: 9,
    textAlign: 'center',
    lineHeight: 14,
  },
});
