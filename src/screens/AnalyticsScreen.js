import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBookings } from '../context/BookingsContext';
import { useReviews } from '../context/ReviewsContext';
import { useAuth } from '../context/AuthContext';
import { LISTINGS } from '../data/mockData';

export default function AnalyticsScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const { getIncomingRequests } = useBookings();
  const { getAvgRating, getReviewsForOwner } = useReviews();

  const requests = getIncomingRequests(user.uid);
  const myListings = LISTINGS.filter((l) => l.owner.uid === user.uid);
  const avg = getAvgRating(user.uid);
  const reviewCount = getReviewsForOwner(user.uid).length;
  const confirmed = requests.filter((r) => r.status === 'confirmed').length;
  const totalRevenue = requests.filter((r) => r.status === 'confirmed').reduce((s, r) => s + r.totalPrice, 0);

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Analytics</Text>
        <View style={{ width: 50 }} />
      </View>

      <View style={styles.body}>
        <View style={styles.grid}>
          <StatCard icon="📦" label="My Listings" value={myListings.length} />
          <StatCard icon="📩" label="Total Requests" value={requests.length} />
          <StatCard icon="✅" label="Confirmed" value={confirmed} />
          <StatCard icon="💰" label="Revenue" value={`$${totalRevenue}`} />
          <StatCard icon="⭐" label="Avg Rating" value={avg > 0 ? avg : 'N/A'} />
          <StatCard icon="📝" label="Reviews" value={reviewCount} />
        </View>
      </View>
    </SafeAreaView>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#fff',
    borderBottomWidth: 1, borderBottomColor: '#E5E7EB',
  },
  back: { fontSize: 16, color: '#2563EB' },
  headerTitle: { fontSize: 17, fontWeight: '600', color: '#111827' },
  body: { padding: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  statCard: {
    width: '48%', backgroundColor: '#fff', borderRadius: 12, padding: 16, alignItems: 'center',
  },
  statIcon: { fontSize: 28, marginBottom: 6 },
  statValue: { fontSize: 22, fontWeight: '700', color: '#111827' },
  statLabel: { fontSize: 12, color: '#6B7280', marginTop: 4 },
});
