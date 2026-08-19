import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFavorites } from '../context/FavoritesContext';
import { LISTINGS } from '../data/mockData';

export default function FavoritesScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { ids } = useFavorites();

  const favorites = LISTINGS.filter((l) => ids.includes(l.id));

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.title}>Favorites</Text>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>❤️</Text>
          <Text style={styles.emptyText}>No favorites yet</Text>
          <Text style={styles.emptySubtext}>Tap the heart icon on listings to save them here</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(l) => l.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('ListingDetail', { listing: item })}
            >
              <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardLocation}>{item.location}</Text>
                <Text style={styles.cardPrice}>${item.price}/{item.priceUnit}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#2563EB', paddingHorizontal: 16, paddingTop: 8 },
  list: { padding: 16, paddingTop: 4 },
  card: { backgroundColor: '#fff', borderRadius: 12, marginBottom: 16, overflow: 'hidden', elevation: 2 },
  cardImage: { width: '100%', height: 180 },
  cardBody: { padding: 12 },
  cardTitle: { fontSize: 17, fontWeight: '600', color: '#111827' },
  cardLocation: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  cardPrice: { fontSize: 16, fontWeight: 'bold', color: '#2563EB', marginTop: 6 },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 80 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyText: { fontSize: 18, fontWeight: '600', color: '#374151' },
  emptySubtext: { fontSize: 14, color: '#9CA3AF', marginTop: 6, textAlign: 'center', paddingHorizontal: 40 },
});
