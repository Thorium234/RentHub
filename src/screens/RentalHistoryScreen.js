import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBookings } from '../context/BookingsContext';
import { useAuth } from '../context/AuthContext';

export default function RentalHistoryScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const { getMyRentals } = useBookings();
  const rentals = getMyRentals(user.uid);

  const active = rentals.filter((r) => r.status === 'confirmed');
  const past = rentals.filter((r) => r.status !== 'confirmed');

  const statusColor = (s) => {
    if (s === 'confirmed') return '#16A34A';
    if (s === 'declined') return '#EF4444';
    return '#F59E0B';
  };

  const renderRental = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.listingTitle}</Text>
        <View style={[styles.badge, { backgroundColor: statusColor(item.status) + '20' }]}>
          <Text style={[styles.badgeText, { color: statusColor(item.status) }]}>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.cardMeta}>Owner: {item.ownerName}</Text>
      <Text style={styles.cardMeta}>Dates: {item.startDate} → {item.endDate}</Text>
      <Text style={styles.cardPrice}>Total: ${item.totalPrice}</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Rentals</Text>
        <View style={{ width: 50 }} />
      </View>

      <FlatList
        data={[...active, ...past]}
        keyExtractor={(r) => r.id}
        renderItem={renderRental}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          active.length > 0 ? <Text style={styles.sectionLabel}>Active ({active.length})</Text> : null
        }
        ListEmptyComponent={<Text style={styles.empty}>No rentals yet</Text>}
      />
    </SafeAreaView>
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
  list: { padding: 16 },
  sectionLabel: { fontSize: 14, fontWeight: '600', color: '#6B7280', marginBottom: 8 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, elevation: 1 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#111827', flex: 1 },
  badge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2, marginLeft: 8 },
  badgeText: { fontSize: 12, fontWeight: '600', textTransform: 'capitalize' },
  cardMeta: { fontSize: 13, color: '#6B7280', marginTop: 4 },
  cardPrice: { fontSize: 15, fontWeight: '700', color: '#2563EB', marginTop: 6 },
  empty: { textAlign: 'center', color: '#9CA3AF', marginTop: 60, fontSize: 15 },
});
