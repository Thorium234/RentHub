import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFavorites } from '../context/FavoritesContext';
import { useBookings } from '../context/BookingsContext';
import AvailabilityCalendar from '../components/AvailabilityCalendar';

export default function ListingDetailScreen({ route, navigation }) {
  const { listing } = route.params;
  const insets = useSafeAreaInsets();
  const { toggle, isFavorite } = useFavorites();
  const { getBookingsForListing } = useBookings();

  const bookedDates = getBookingsForListing(listing.id)
    .filter((b) => b.status === 'confirmed')
    .flatMap((b) => {
      const dates = [];
      const s = new Date(b.startDate);
      const e = new Date(b.endDate);
      while (s <= e) { dates.push(new Date(s).toISOString().split('T')[0]); s.setDate(s.getDate() + 1); }
      return dates;
    });

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggle(listing.id)} style={styles.heartBtn}>
          <Text style={styles.heart}>{isFavorite(listing.id) ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: listing.imageUrl }} style={styles.image} />

        <View style={styles.body}>
          <Text style={styles.title}>{listing.title}</Text>
          <Text style={styles.price}>${listing.price}/{listing.priceUnit}</Text>
          <Text style={styles.location}>📍 {listing.location}</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{listing.description}</Text>

          <Text style={styles.sectionTitle}>Availability</Text>
          <AvailabilityCalendar bookedDates={bookedDates} />

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Listed by</Text>
          <View style={styles.owner}>
            <TouchableOpacity style={styles.ownerRow} onPress={() => navigation.navigate('OwnerProfile', { owner: listing.owner })}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{listing.owner.name[0]}</Text>
              </View>
              <Text style={styles.ownerName}>{listing.owner.name}</Text>
              <Text style={styles.ownerArrow}>›</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('WriteReview', { ownerId: listing.owner.uid, ownerName: listing.owner.name })}>
            <Text style={styles.reviewLink}>Write a review →</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bookButton} onPress={() => navigation.navigate('BookingRequest', { listing })}>
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.chatButton} onPress={() => navigation.navigate('Chat', { listing })}>
            <Text style={styles.chatButtonText}>Chat with Owner</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 8 },
  backBtn: { padding: 4 },
  backText: { fontSize: 16, color: '#2563EB', fontWeight: '500' },
  heartBtn: { padding: 4 },
  heart: { fontSize: 22 },
  content: { paddingBottom: 40 },
  image: { width: '100%', height: 280 },
  body: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
  price: { fontSize: 20, fontWeight: '700', color: '#2563EB', marginTop: 6 },
  location: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#374151', marginBottom: 8 },
  description: { fontSize: 15, color: '#4B5563', lineHeight: 22 },
  owner: { marginTop: 4 },
  ownerRow: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#DBEAFE',
    alignItems: 'center', justifyContent: 'center', marginRight: 10,
  },
  avatarText: { fontSize: 18, fontWeight: '600', color: '#2563EB' },
  ownerName: { fontSize: 15, color: '#374151' },
  ownerArrow: { fontSize: 18, color: '#9CA3AF', marginLeft: 4 },
  reviewLink: { fontSize: 14, color: '#2563EB', fontWeight: '500', marginTop: 12 },
  bookButton: {
    backgroundColor: '#2563EB', borderRadius: 12, padding: 16,
    alignItems: 'center', marginTop: 24,
  },
  bookButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  chatButton: {
    borderWidth: 1.5, borderColor: '#2563EB', borderRadius: 12, padding: 16,
    alignItems: 'center', marginTop: 10,
  },
  chatButtonText: { color: '#2563EB', fontSize: 16, fontWeight: '600' },
});
