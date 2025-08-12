import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { Colors } from '../../constants/Colors';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

export default function TournamentsScreen() {
  const { data: tournaments, isLoading, refetch } = useQuery({
    queryKey: ['tournaments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tournaments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return { text: 'قادمة', color: '#3B82F6' };
      case 'active':
        return { text: 'نشطة', color: '#10B981' };
      case 'completed':
        return { text: 'مكتملة', color: '#6B7280' };
      case 'cancelled':
        return { text: 'ملغية', color: '#EF4444' };
      default:
        return { text: 'قادمة', color: '#3B82F6' };
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} tintColor={Colors.s3mRed} />
      }
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>البطولات والمنافسات</Text>
        <Text style={styles.headerSubtitle}>شارك في أقوى البطولات واربح جوائز مميزة</Text>
      </View>

      {/* Tournaments Grid */}
      <View style={styles.tournamentsContainer}>
        {tournaments?.map((tournament) => {
          const statusBadge = getStatusBadge(tournament.status);
          
          return (
            <TouchableOpacity
              key={tournament.id}
              style={styles.tournamentCard}
              onPress={() => router.push(`/tournament/${tournament.id}`)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['rgba(220,20,60,0.05)', 'rgba(0,0,0,0.1)']}
                style={styles.cardGradient}
              >
                {tournament.image_url && (
                  <View style={styles.tournamentImageContainer}>
                    <Image 
                      source={{ uri: tournament.image_url }} 
                      style={styles.tournamentImage}
                    />
                    <View style={styles.statusBadge}>
                      <View style={[styles.statusBadgeInner, { backgroundColor: statusBadge.color }]}>
                        <Text style={styles.statusText}>{statusBadge.text}</Text>
                      </View>
                    </View>
                  </View>
                )}
                
                <View style={styles.tournamentContent}>
                  <Text style={styles.tournamentTitle} numberOfLines={2}>
                    {tournament.title}
                  </Text>
                  
                  <Text style={styles.tournamentDescription} numberOfLines={3}>
                    {tournament.description}
                  </Text>
                  
                  <View style={styles.tournamentInfo}>
                    <View style={styles.infoItem}>
                      <Ionicons name="calendar" size={16} color={Colors.s3mRed} />
                      <Text style={styles.infoText}>
                        {format(new Date(tournament.start_date), 'dd/MM/yyyy', { locale: ar })}
                      </Text>
                    </View>
                    
                    <View style={styles.infoItem}>
                      <Ionicons name="time" size={16} color={Colors.s3mRed} />
                      <Text style={styles.infoText}>
                        آخر موعد: {format(new Date(tournament.registration_deadline), 'dd/MM', { locale: ar })}
                      </Text>
                    </View>
                    
                    <View style={styles.infoItem}>
                      <Ionicons name="people" size={16} color={Colors.s3mRed} />
                      <Text style={styles.infoText}>
                        حتى {tournament.max_teams} فريق
                      </Text>
                    </View>
                  </View>
                  
                  {tournament.prize_info && (
                    <View style={styles.prizeInfo}>
                      <Ionicons name="trophy" size={16} color="#FFD700" />
                      <Text style={styles.prizeText}>جوائز مميزة</Text>
                    </View>
                  )}
                  
                  <TouchableOpacity style={styles.detailsButton}>
                    <LinearGradient
                      colors={[Colors.s3mRed, '#B91C1C']}
                      style={styles.buttonGradient}
                    >
                      <Text style={styles.buttonText}>عرض التفاصيل</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          );
        })}
      </View>

      {tournaments?.length === 0 && (
        <View style={styles.emptyState}>
          <Ionicons name="game-controller" size={64} color="rgba(255,255,255,0.3)" />
          <Text style={styles.emptyTitle}>لا توجد بطولات حالياً</Text>
          <Text style={styles.emptyDescription}>
            ترقب البطولات القادمة قريباً
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    paddingVertical: 32,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: 'Cairo-Bold',
    color: Colors.s3mRed,
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Cairo-Regular',
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
  },
  tournamentsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    gap: 16,
  },
  tournamentCard: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(220,20,60,0.2)',
  },
  cardGradient: {
    flex: 1,
  },
  tournamentImageContainer: {
    height: 200,
    position: 'relative',
  },
  tournamentImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  statusBadgeInner: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Cairo-Bold',
    color: 'white',
  },
  tournamentContent: {
    padding: 20,
  },
  tournamentTitle: {
    fontSize: 20,
    fontFamily: 'Cairo-Bold',
    color: 'white',
    marginBottom: 12,
    lineHeight: 28,
  },
  tournamentDescription: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 16,
    lineHeight: 20,
  },
  tournamentInfo: {
    gap: 8,
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 12,
    fontFamily: 'Cairo-Regular',
    color: 'rgba(255,255,255,0.6)',
  },
  prizeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  prizeText: {
    fontSize: 14,
    fontFamily: 'Cairo-SemiBold',
    color: '#FFD700',
  },
  detailsButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: 'white',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Cairo-Bold',
    color: 'rgba(255,255,255,0.7)',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    fontFamily: 'Cairo-Regular',
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
  },
});