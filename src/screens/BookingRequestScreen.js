import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBookings } from '../context/BookingsContext';
import { useAuth } from '../context/AuthContext';

export default function BookingRequestScreen({ route, navigation }) {
  const { listing } = route.params;
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const { createBooking } = useBookings();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const days = calcDays(startDate, endDate);
  const total = days > 0 ? days * listing.price : 0;

  const handleSubmit = () => {
    if (!startDate || !endDate) {
      Alert.alert('Missing dates', 'Please enter both start and end dates.');
      return;
    }
    if (days <= 0) {
      Alert.alert('Invalid dates', 'End date must be after start date.');
      return;
    }

    createBooking({
      listingId: listing.id,
      listingTitle: listing.title,
      customerId: user.uid,
      customerName: user.displayName || user.email,
      ownerId: listing.owner.uid,
      ownerName: listing.owner.name,
      startDate,
      endDate,
      totalPrice: total,
    });

    Alert.alert('Request Sent', `Your booking request for "${listing.title}" has been sent to ${listing.owner.name}.`, [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book {listing.title}</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.infoCard}>
          <Text style={styles.price}>${listing.price} / day</Text>
          <Text style={styles.location}>📍 {listing.location}</Text>
        </View>

        <Text style={styles.label}>Start Date</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={startDate}
          onChangeText={setStartDate}
        />

        <Text style={styles.label}>End Date</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={endDate}
          onChangeText={setEndDate}
        />

        {days > 0 && (
          <View style={styles.summary}>
            <Text style={styles.summaryLine}>{days} day{days > 1 ? 's' : ''} × ${listing.price}</Text>
            <Text style={styles.summaryTotal}>Total: ${total}</Text>
          </View>
        )}

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>Send Booking Request</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function calcDays(start, end) {
  try {
    const s = new Date(start);
    const e = new Date(end);
    const diff = (e - s) / (1000 * 60 * 60 * 24);
    return diff > 0 ? Math.ceil(diff) : 0;
  } catch {
    return 0;
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E5E7EB',
  },
  back: { fontSize: 16, color: '#2563EB' },
  headerTitle: { fontSize: 17, fontWeight: '600', color: '#111827' },
  body: { padding: 16 },
  infoCard: {
    backgroundColor: '#F3F4F6', borderRadius: 12, padding: 16, marginBottom: 20,
  },
  price: { fontSize: 18, fontWeight: '700', color: '#2563EB' },
  location: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  label: { fontSize: 14, fontWeight: '600', color: '#374151', marginTop: 12, marginBottom: 6 },
  input: {
    borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 12,
    padding: 14, fontSize: 15, backgroundColor: '#F9FAFB',
  },
  summary: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#EFF6FF', borderRadius: 12, padding: 16, marginTop: 20,
  },
  summaryLine: { fontSize: 15, color: '#374151' },
  summaryTotal: { fontSize: 18, fontWeight: '700', color: '#2563EB' },
  submitBtn: {
    backgroundColor: '#2563EB', borderRadius: 12, padding: 16,
    alignItems: 'center', marginTop: 24,
  },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
