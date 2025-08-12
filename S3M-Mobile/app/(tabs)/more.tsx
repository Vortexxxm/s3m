import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { Colors } from '../../constants/Colors';

export default function MoreScreen() {
  const { user, signOut, userRole } = useAuth();

  const handleSignOut = () => {
    Alert.alert(
      'تسجيل الخروج',
      'هل أنت متأكد من تسجيل الخروج؟',
      [
        { text: 'إلغاء', style: 'cancel' },
        { 
          text: 'تسجيل الخروج', 
          style: 'destructive',
          onPress: signOut 
        },
      ]
    );
  };

  const menuItems = [
    {
      title: 'الملف الشخصي',
      icon: 'person',
      onPress: () => router.push('/profile'),
      requireAuth: true,
    },
    {
      title: 'من نحن',
      icon: 'information-circle',
      onPress: () => router.push('/about'),
      requireAuth: false,
    },
    {
      title: 'الفريق والمطورين',
      icon: 'people',
      onPress: () => router.push('/team'),
      requireAuth: false,
    },
    {
      title: 'انضم إلينا',
      icon: 'add-circle',
      onPress: () => router.push('/join-us'),
      requireAuth: false,
    },
    {
      title: 'لوحة الإدارة',
      icon: 'settings',
      onPress: () => router.push('/admin'),
      requireAuth: true,
      adminOnly: true,
    },
    {
      title: 'الشروط والأحكام',
      icon: 'document-text',
      onPress: () => router.push('/terms'),
      requireAuth: false,
    },
    {
      title: 'سياسة الخصوصية',
      icon: 'shield-checkmark',
      onPress: () => router.push('/privacy'),
      requireAuth: false,
    },
  ];

  const filteredMenuItems = menuItems.filter(item => {
    if (item.requireAuth && !user) return false;
    if (item.adminOnly && userRole !== 'admin') return false;
    return true;
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={['rgba(220,20,60,0.2)', 'rgba(185,28,28,0.2)']}
        style={styles.header}
      >
        <Image
          source={{ uri: '/lovable-uploads/876694d5-ec41-469d-9b93-b1c067364893.png' }}
          style={styles.logo}
        />
        <Text style={styles.headerTitle}>S3M E-Sports</Text>
        <Text style={styles.headerSubtitle}>فريق الألعاب الإلكترونية المحترف</Text>
      </LinearGradient>

      {/* User Info */}
      {user && (
        <View style={styles.userSection}>
          <View style={styles.userCard}>
            <LinearGradient
              colors={['rgba(220,20,60,0.1)', 'rgba(0,0,0,0.1)']}
              style={styles.userCardGradient}
            >
              <View style={styles.userInfo}>
                <View style={styles.userAvatar}>
                  <Ionicons name="person" size={32} color="white" />
                </View>
                <View style={styles.userDetails}>
                  <Text style={styles.userName}>مرحباً بك</Text>
                  <Text style={styles.userEmail}>{user.email}</Text>
                  {userRole === 'admin' && (
                    <View style={styles.adminBadge}>
                      <Text style={styles.adminBadgeText}>مدير</Text>
                    </View>
                  )}
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>
      )}

      {/* Menu Items */}
      <View style={styles.menuSection}>
        {filteredMenuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.onPress}
            activeOpacity={0.7}
          >
            <View style={styles.menuItemContent}>
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIcon}>
                  <Ionicons name={item.icon as any} size={24} color={Colors.s3mRed} />
                </View>
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.4)" />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Auth Section */}
      <View style={styles.authSection}>
        {user ? (
          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <View style={styles.signOutContent}>
              <Ionicons name="log-out" size={24} color="#EF4444" />
              <Text style={styles.signOutText}>تسجيل الخروج</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.authButtons}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => router.push('/login')}
            >
              <LinearGradient
                colors={[Colors.s3mRed, '#B91C1C']}
                style={styles.buttonGradient}
              >
                <Text style={styles.authButtonText}>تسجيل الدخول</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.signupButton}
              onPress={() => router.push('/signup')}
            >
              <Text style={styles.signupButtonText}>إنشاء حساب</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2025 S3M E-Sports. جميع الحقوق محفوظة.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 16,
    margin: 16,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Cairo-Bold',
    color: Colors.s3mRed,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
  },
  userSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  userCard: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(220,20,60,0.2)',
  },
  userCardGradient: {
    padding: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.s3mRed,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: 'white',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 8,
  },
  adminBadge: {
    backgroundColor: Colors.s3mRed,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  adminBadgeText: {
    fontSize: 12,
    fontFamily: 'Cairo-Bold',
    color: 'white',
  },
  menuSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  menuItem: {
    backgroundColor: 'rgba(220,20,60,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(220,20,60,0.1)',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(220,20,60,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: 'Cairo-SemiBold',
    color: 'white',
  },
  authSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  authButtons: {
    gap: 12,
  },
  loginButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  signupButton: {
    borderWidth: 2,
    borderColor: Colors.s3mRed,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  authButtonText: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: 'white',
  },
  signupButtonText: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: Colors.s3mRed,
  },
  signOutButton: {
    backgroundColor: 'rgba(239,68,68,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.2)',
    borderRadius: 12,
    overflow: 'hidden',
  },
  signOutContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 12,
  },
  signOutText: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#EF4444',
  },
  footer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    fontFamily: 'Cairo-Regular',
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
  },
});