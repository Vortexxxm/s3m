import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { Colors } from '../../constants/Colors';

type LeaderboardEntry = {
  user_id: string;
  points: number;
  wins: number;
  losses: number;
  kills: number;
  deaths: number;
  games_played: number;
  rank_position: number;
  visible_in_leaderboard: boolean;
  profiles: {
    username: string;
    avatar_url: string | null;
  } | null;
};

export default function LeaderboardScreen() {
  const { data: leaderboard, isLoading, refetch } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      const { data: scoresData, error: scoresError } = await supabase
        .from('leaderboard_scores')
        .select('*')
        .eq('visible_in_leaderboard', true)
        .order('rank_position', { ascending: true });

      if (scoresError) throw scoresError;

      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, username, avatar_url');

      if (profilesError) throw profilesError;

      const combinedData: LeaderboardEntry[] = scoresData.map(score => ({
        ...score,
        profiles: profilesData.find(profile => profile.id === score.user_id) || null,
      }));

      return combinedData;
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel('leaderboard-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'leaderboard_scores'
        },
        () => {
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  const getKDRatio = (kills: number, deaths: number) => {
    if (deaths === 0) return kills > 0 ? kills.toFixed(1) : "0.0";
    return (kills / deaths).toFixed(1);
  };

  const getWinRate = (wins: number, gamesPlayed: number) => {
    if (gamesPlayed === 0) return "0%";
    return `${((wins / gamesPlayed) * 100).toFixed(1)}%`;
  };

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Ionicons name="trophy" size={24} color="#FFD700" />;
      case 2:
        return <Ionicons name="trophy" size={24} color="#C0C0C0" />;
      case 3:
        return <Ionicons name="trophy" size={24} color="#CD7F32" />;
      default:
        return (
          <View style={styles.rankNumber}>
            <Text style={styles.rankNumberText}>#{position}</Text>
          </View>
        );
    }
  };

  const getRankColors = (position: number) => {
    switch (position) {
      case 1:
        return {
          gradient: ['#FFD700', '#FFA500'],
          border: '#FFD700',
          shadow: 'rgba(255,215,0,0.3)',
        };
      case 2:
        return {
          gradient: ['#C0C0C0', '#A0A0A0'],
          border: '#C0C0C0',
          shadow: 'rgba(192,192,192,0.3)',
        };
      case 3:
        return {
          gradient: ['#CD7F32', '#B8860B'],
          border: '#CD7F32',
          shadow: 'rgba(205,127,50,0.3)',
        };
      default:
        return {
          gradient: [Colors.s3mRed, '#B91C1C'],
          border: Colors.s3mRed,
          shadow: 'rgba(220,20,60,0.2)',
        };
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
      <LinearGradient
        colors={['rgba(220,20,60,0.2)', 'rgba(185,28,28,0.2)']}
        style={styles.header}
      >
        <Ionicons name="trophy" size={48} color="#FFD700" />
        <Text style={styles.headerTitle}>قائمة المتصدرين</Text>
        <Text style={styles.headerSubtitle}>أساطير فريق S3M</Text>
      </LinearGradient>

      {/* Leaderboard */}
      <View style={styles.leaderboardContainer}>
        {leaderboard?.map((player, index) => {
          const position = player.rank_position || index + 1;
          const colors = getRankColors(position);
          
          return (
            <View key={player.user_id} style={[styles.playerCard, { borderColor: colors.border }]}>
              <LinearGradient
                colors={[`${colors.shadow}`, 'rgba(0,0,0,0.1)']}
                style={styles.playerCardGradient}
              >
                <View style={styles.playerHeader}>
                  <View style={styles.playerRank}>
                    {getRankIcon(position)}
                  </View>
                  
                  <View style={styles.playerAvatar}>
                    {player.profiles?.avatar_url ? (
                      <Image 
                        source={{ uri: player.profiles.avatar_url }} 
                        style={styles.avatarImage}
                      />
                    ) : (
                      <View style={[styles.avatarFallback, { backgroundColor: colors.border }]}>
                        <Text style={styles.avatarText}>
                          {(player.profiles?.username || 'U').slice(0, 2).toUpperCase()}
                        </Text>
                      </View>
                    )}
                  </View>
                  
                  <View style={styles.playerInfo}>
                    <Text style={styles.playerName}>
                      {player.profiles?.username || 'مجهول'}
                    </Text>
                    <View style={styles.pointsBadge}>
                      <LinearGradient
                        colors={colors.gradient}
                        style={styles.pointsGradient}
                      >
                        <Text style={styles.pointsText}>
                          {player.points.toLocaleString()} نقطة
                        </Text>
                      </LinearGradient>
                    </View>
                  </View>
                </View>

                <View style={styles.playerStats}>
                  <View style={styles.statItem}>
                    <Ionicons name="trophy" size={16} color="#FFD700" />
                    <Text style={styles.statLabel}>الانتصارات</Text>
                    <Text style={styles.statValue}>{player.wins}</Text>
                  </View>
                  
                  <View style={styles.statItem}>
                    <Ionicons name="target" size={16} color="#EF4444" />
                    <Text style={styles.statLabel}>K/D</Text>
                    <Text style={styles.statValue}>
                      {getKDRatio(player.kills, player.deaths)}
                    </Text>
                  </View>
                  
                  <View style={styles.statItem}>
                    <Ionicons name="game-controller" size={16} color="#3B82F6" />
                    <Text style={styles.statLabel}>الألعاب</Text>
                    <Text style={styles.statValue}>{player.games_played}</Text>
                  </View>
                  
                  <View style={styles.statItem}>
                    <Ionicons name="flash" size={16} color="#10B981" />
                    <Text style={styles.statLabel}>معدل الفوز</Text>
                    <Text style={styles.statValue}>
                      {getWinRate(player.wins, player.games_played)}
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
          );
        })}
      </View>

      {(!leaderboard || leaderboard.length === 0) && (
        <View style={styles.emptyState}>
          <Ionicons name="trophy" size={64} color="rgba(255,255,255,0.3)" />
          <Text style={styles.emptyTitle}>لا توجد نتائج حتى الآن</Text>
          <Text style={styles.emptyDescription}>
            سيتم عرض أفضل اللاعبين هنا عند بدء المنافسات
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
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 16,
    margin: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: 'Cairo-Bold',
    color: Colors.s3mRed,
    marginTop: 16,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 18,
    fontFamily: 'Cairo-Regular',
    color: 'rgba(255,255,255,0.9)',
  },
  leaderboardContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    gap: 16,
  },
  playerCard: {
    borderRadius: 16,
    borderWidth: 2,
    overflow: 'hidden',
  },
  playerCardGradient: {
    padding: 20,
  },
  playerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  playerRank: {
    width: 40,
    alignItems: 'center',
    marginRight: 16,
  },
  rankNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankNumberText: {
    fontSize: 12,
    fontFamily: 'Cairo-Bold',
    color: 'rgba(255,255,255,0.6)',
  },
  playerAvatar: {
    marginRight: 16,
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: Colors.s3mRed,
  },
  avatarFallback: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: 'white',
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 20,
    fontFamily: 'Cairo-Bold',
    color: 'white',
    marginBottom: 8,
  },
  pointsBadge: {
    borderRadius: 8,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  pointsGradient: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  pointsText: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: 'white',
  },
  playerStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 12,
    padding: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 10,
    fontFamily: 'Cairo-Regular',
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
    marginBottom: 2,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: 'white',
    textAlign: 'center',
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