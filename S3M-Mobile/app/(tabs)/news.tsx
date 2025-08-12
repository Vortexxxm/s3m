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
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { Colors } from '../../constants/Colors';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

export default function NewsScreen() {
  const { data: news, isLoading, refetch } = useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

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
        <Text style={styles.headerTitle}>الأخبار والتحديثات</Text>
        <Text style={styles.headerSubtitle}>آخر أخبار الفريق والبطولات</Text>
      </View>

      {/* News List */}
      <View style={styles.newsContainer}>
        {news?.map((item) => (
          <TouchableOpacity key={item.id} style={styles.newsCard} activeOpacity={0.8}>
            <LinearGradient
              colors={['rgba(220,20,60,0.05)', 'rgba(0,0,0,0.1)']}
              style={styles.cardGradient}
            >
              {item.image_url && (
                <Image source={{ uri: item.image_url }} style={styles.newsImage} />
              )}
              
              <View style={styles.newsContent}>
                <Text style={styles.newsTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                
                <Text style={styles.newsDescription} numberOfLines={3}>
                  {item.description}
                </Text>
                
                <View style={styles.newsFooter}>
                  <View style={styles.newsDate}>
                    <Ionicons name="calendar" size={14} color={Colors.s3mRed} />
                    <Text style={styles.dateText}>
                      {format(new Date(item.created_at), 'PPP', { locale: ar })}
                    </Text>
                  </View>
                  
                  <View style={styles.newsAuthor}>
                    <Ionicons name="person" size={14} color="rgba(255,255,255,0.6)" />
                    <Text style={styles.authorText}>الإدارة</Text>
                  </View>
                </View>
                
                {item.content && (
                  <TouchableOpacity style={styles.readMoreButton}>
                    <Text style={styles.readMoreText}>قراءة المزيد</Text>
                    <Ionicons name="chevron-down" size={16} color={Colors.s3mRed} />
                  </TouchableOpacity>
                )}
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>

      {news?.length === 0 && (
        <View style={styles.emptyState}>
          <Ionicons name="newspaper" size={64} color="rgba(255,255,255,0.3)" />
          <Text style={styles.emptyTitle}>لا توجد أخبار حالياً</Text>
          <Text style={styles.emptyDescription}>
            ترقب الأخبار والتحديثات الجديدة
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
  newsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    gap: 16,
  },
  newsCard: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(220,20,60,0.1)',
  },
  cardGradient: {
    flex: 1,
  },
  newsImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  newsContent: {
    padding: 20,
  },
  newsTitle: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: Colors.s3mRed,
    marginBottom: 12,
    lineHeight: 26,
  },
  newsDescription: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 16,
    lineHeight: 22,
  },
  newsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  newsDate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    fontSize: 12,
    fontFamily: 'Cairo-Regular',
    color: 'rgba(255,255,255,0.6)',
  },
  newsAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  authorText: {
    fontSize: 12,
    fontFamily: 'Cairo-Regular',
    color: 'rgba(255,255,255,0.6)',
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
  },
  readMoreText: {
    fontSize: 14,
    fontFamily: 'Cairo-SemiBold',
    color: Colors.s3mRed,
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