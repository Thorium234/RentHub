import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBookings } from '../context/BookingsContext';
import { useAuth } from '../context/AuthContext';

export default function OwnerDashboardScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const { getIncomingRequests, updateStatus } = useBookings();
  const requests = getIncomingRequests(user.uid);

  const pending = requests.filter((r) => r.status === 'pending');
  const others = requests.filter((r) => r.status !== 'pending');

  const statusColor = (s) => {
    if (s === 'confirmed') return '#16A34A';
    if (s === 'declined') return '#EF4444';
    return '#F59E0B';
  };

  const renderRequest = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.listingTitle}</Text>
        <View style={[styles.badge, { backgroundColor: statusColor(item.status) + '20' }]}>
          <Text style={[styles.badgeText, { color: statusColor(item.status) }]}>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.cardMeta}>From: {item.customerName}</Text>
      <Text style={styles.cardMeta}>Dates: {item.startDate} → {item.endDate}</Text>
      <Text style={styles.cardPrice}>Total: ${item.totalPrice}</Text>

      {item.status === 'pending' && (
        <View style={styles.actions}>
          <TouchableOpacity style={styles.acceptBtn} onPress={() => updateStatus(item.id, 'confirmed')}>
            <Text style={styles.acceptText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.declineBtn} onPress={() => updateStatus(item.id, 'declined')}>
            <Text style={styles.declineText}>Decline</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Dashboard</Text>
        <View style={{ width: 50 }} />
      </View>

      <FlatList
        data={[...pending, ...others]}
        keyExtractor={(r) => r.id}
        renderItem={renderRequest}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          pending.length > 0 ? <Text style={styles.sectionLabel}>Pending ({pending.length})</Text> : null
        }
        ListEmptyComponent={<Text style={styles.empty}>No booking requests yet</Text>}
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
  actions: { flexDirection: 'row', marginTop: 12, gap: 8 },
  acceptBtn: { flex: 1, backgroundColor: '#16A34A', borderRadius: 8, padding: 10, alignItems: 'center' },
  acceptText: { color: '#fff', fontWeight: '600' },
  declineBtn: { flex: 1, backgroundColor: '#FEE2E2', borderRadius: 8, padding: 10, alignItems: 'center' },
  declineText: { color: '#EF4444', fontWeight: '600' },
  empty: { textAlign: 'center', color: '#9CA3AF', marginTop: 60, fontSize: 15 },
});
