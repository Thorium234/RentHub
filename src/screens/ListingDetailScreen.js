import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ListingDetailScreen({ route, navigation }) {
  const { listing } = route.params;
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
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

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Listed by</Text>
          <View style={styles.owner}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{listing.owner.name[0]}</Text>
            </View>
            <Text style={styles.ownerName}>{listing.owner.name}</Text>
          </View>

          <TouchableOpacity style={styles.rentButton} onPress={() => Alert.alert('Request Sent', `Your request for "${listing.title}" has been sent to ${listing.owner.name}.`)}>
            <Text style={styles.rentButtonText}>Request to Rent</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { paddingHorizontal: 16, paddingVertical: 8 },
  backBtn: { padding: 4 },
  backText: { fontSize: 16, color: '#2563EB', fontWeight: '500' },
  content: { paddingBottom: 40 },
  image: { width: '100%', height: 280 },
  body: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
  price: { fontSize: 20, fontWeight: '700', color: '#2563EB', marginTop: 6 },
  location: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#374151', marginBottom: 8 },
  description: { fontSize: 15, color: '#4B5563', lineHeight: 22 },
  owner: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#DBEAFE',
    alignItems: 'center', justifyContent: 'center', marginRight: 10,
  },
  avatarText: { fontSize: 18, fontWeight: '600', color: '#2563EB' },
  ownerName: { fontSize: 15, color: '#374151' },
  rentButton: {
    backgroundColor: '#2563EB', borderRadius: 12, padding: 16,
    alignItems: 'center', marginTop: 24,
  },
  rentButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
