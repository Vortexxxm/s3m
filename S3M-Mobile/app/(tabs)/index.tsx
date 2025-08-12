import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { useAuth } from '../../contexts/AuthContext';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { user } = useAuth();

  const stats = [
    { icon: 'people', label: 'أعضاء الفريق', value: '50+' },
    { icon: 'trophy', label: 'بطولات', value: '5' },
    { icon: 'target', label: 'معدل الفوز', value: '85%' },
    { icon: 'flash', label: 'نقاط القوة', value: '9500+' },
  ];

  const features = [
    {
      title: 'تدريب احترافي',
      description: 'برامج تدريبية متخصصة لتطوير مهاراتك في Free Fire',
      icon: 'target',
    },
    {
      title: 'فريق متميز',
      description: 'انضم إلى نخبة من أفضل اللاعبين في المنطقة',
      icon: 'people',
    },
    {
      title: 'بطولات مستمرة',
      description: 'مشاركة في أقوى البطولات المحلية والدولية',
      icon: 'trophy',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1920&q=80' }}
        style={styles.heroSection}
        imageStyle={styles.heroImage}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'rgba(220,20,60,0.3)', 'rgba(0,0,0,0.8)']}
          style={styles.heroGradient}
        >
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>S3M E-Sports</Text>
            <Text style={styles.heroSubtitle}>
              فريق الألعاب الإلكترونية المحترف المتخصص في لعبة Free Fire
            </Text>
            <Text style={styles.heroDescription}>
              انضم إلى نخبة اللاعبين وكن جزءاً من رحلتنا نحو القمة في عالم الألعاب الإلكترونية
            </Text>
            
            <View style={styles.heroButtons}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => router.push('/join-us')}
              >
                <LinearGradient
                  colors={[Colors.s3mRed, '#B91C1C']}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.buttonText}>انضم إلى الفريق</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => router.push('/about')}
              >
                <Text style={styles.secondaryButtonText}>تعرف علينا أكثر</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>

      {/* Stats Section */}
      <View style={styles.statsSection}>
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Ionicons name={stat.icon as any} size={32} color={Colors.s3mRed} />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>لماذا S3M E-Sports؟</Text>
        <Text style={styles.sectionSubtitle}>
          نحن أكثر من مجرد فريق ألعاب، نحن عائلة من المحترفين المتفانين
        </Text>
        
        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <Ionicons name={feature.icon as any} size={32} color="white" />
              </View>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* CTA Section */}
      <View style={styles.ctaSection}>
        <LinearGradient
          colors={['rgba(220,20,60,0.1)', 'rgba(185,28,28,0.1)']}
          style={styles.ctaGradient}
        >
          <Text style={styles.ctaTitle}>جاهز للانضمام إلى النخبة؟</Text>
          <Text style={styles.ctaDescription}>
            ابدأ رحلتك معنا اليوم وكن جزءاً من قصة نجاح S3M E-Sports
          </Text>
          
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => router.push('/join-us')}
          >
            <LinearGradient
              colors={[Colors.s3mRed, '#B91C1C']}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>ابدأ الآن</Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  heroSection: {
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImage: {
    opacity: 0.3,
  },
  heroGradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heroContent: {
    alignItems: 'center',
    maxWidth: 350,
  },
  heroTitle: {
    fontSize: 48,
    fontFamily: 'Cairo-Bold',
    color: Colors.s3mRed,
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: 'rgba(220,20,60,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  heroSubtitle: {
    fontSize: 18,
    fontFamily: 'Cairo-SemiBold',
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 26,
  },
  heroDescription: {
    fontSize: 16,
    fontFamily: 'Cairo-Regular',
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  heroButtons: {
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: Colors.s3mRed,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  buttonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
  },
  secondaryButtonText: {
    color: Colors.s3mRed,
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
  },
  statsSection: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  statCard: {
    width: (width - 60) / 2,
    backgroundColor: 'rgba(220,20,60,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(220,20,60,0.2)',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Cairo-Bold',
    color: 'white',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Cairo-Regular',
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
  },
  featuresSection: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 32,
    fontFamily: 'Cairo-Bold',
    color: Colors.s3mRed,
    textAlign: 'center',
    marginBottom: 16,
  },
  sectionSubtitle: {
    fontSize: 18,
    fontFamily: 'Cairo-Regular',
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 26,
  },
  featuresGrid: {
    gap: 20,
  },
  featureCard: {
    backgroundColor: 'rgba(220,20,60,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(220,20,60,0.1)',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  featureIconContainer: {
    width: 64,
    height: 64,
    backgroundColor: Colors.s3mRed,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 20,
    fontFamily: 'Cairo-Bold',
    color: 'white',
    marginBottom: 12,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    lineHeight: 22,
  },
  ctaSection: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  ctaGradient: {
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 28,
    fontFamily: 'Cairo-Bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  ctaDescription: {
    fontSize: 16,
    fontFamily: 'Cairo-Regular',
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  ctaButton: {
    borderRadius: 12,
    overflow: 'hidden',
    width: '100%',
  },
});