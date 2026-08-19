import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useReviews } from '../context/ReviewsContext';
import { LISTINGS } from '../data/mockData';

export default function OwnerProfileScreen({ route, navigation }) {
  const { owner } = route.params;
  const insets = useSafeAreaInsets();
  const { getReviewsForOwner, getAvgRating } = useReviews();
  const reviews = getReviewsForOwner(owner.uid);
  const avg = getAvgRating(owner.uid);
  const ownerListings = LISTINGS.filter((l) => l.owner.uid === owner.uid);

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Owner Profile</Text>
        <View style={{ width: 50 }} />
      </View>

      <FlatList
        data={ownerListings}
        keyExtractor={(l) => l.id}
        ListHeaderComponent={
          <>
            <View style={styles.profileCard}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{owner.name[0]}</Text>
              </View>
              <Text style={styles.name}>{owner.name}</Text>
              {avg > 0 && (
                <Text style={styles.rating}>⭐ {avg} ({reviews.length} review{reviews.length !== 1 ? 's' : ''})</Text>
              )}
            </View>

            {reviews.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Reviews</Text>
                {reviews.map((r) => (
                  <View key={r.id} style={styles.reviewCard}>
                    <View style={styles.reviewHeader}>
                      <Text style={styles.reviewer}>{r.reviewerName}</Text>
                      <Text style={styles.reviewRating}>{'⭐'.repeat(r.rating)}</Text>
                    </View>
                    <Text style={styles.reviewText}>{r.text}</Text>
                    <Text style={styles.reviewDate}>{r.date}</Text>
                  </View>
                ))}
              </View>
            )}

            <Text style={styles.sectionTitle}>Listings by {owner.name}</Text>
          </>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ListingDetail', { listing: item })}
          >
            <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardPrice}>${item.price}/{item.priceUnit}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>No listings from this owner</Text>}
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
  profileCard: { alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 20, marginBottom: 16 },
  avatar: {
    width: 70, height: 70, borderRadius: 35, backgroundColor: '#DBEAFE',
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: 28, fontWeight: '600', color: '#2563EB' },
  name: { fontSize: 20, fontWeight: '600', color: '#111827', marginTop: 10 },
  rating: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#374151', marginBottom: 8 },
  reviewCard: { backgroundColor: '#fff', borderRadius: 10, padding: 12, marginBottom: 8 },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  reviewer: { fontSize: 14, fontWeight: '600', color: '#111827' },
  reviewRating: { fontSize: 12 },
  reviewText: { fontSize: 13, color: '#4B5563', marginTop: 4 },
  reviewDate: { fontSize: 11, color: '#9CA3AF', marginTop: 4 },
  card: { backgroundColor: '#fff', borderRadius: 12, marginBottom: 12, overflow: 'hidden', elevation: 1 },
  cardImage: { width: '100%', height: 160 },
  cardBody: { padding: 12 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#111827' },
  cardPrice: { fontSize: 15, fontWeight: '700', color: '#2563EB', marginTop: 4 },
  empty: { textAlign: 'center', color: '#9CA3AF', marginTop: 40 },
});
