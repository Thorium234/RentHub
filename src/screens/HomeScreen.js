import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import { CATEGORIES, LISTINGS } from '../data/mockData';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const insets = useSafeAreaInsets();

  const filtered = LISTINGS.filter((l) => {
    const matchesSearch = l.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || l.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderListing = ({ item }) => (
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
  );

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.header}>RentHub</Text>
      <TextInput
        style={styles.search}
        placeholder="Search rentals..."
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        horizontal
        data={CATEGORIES}
        keyExtractor={(c) => c.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categories}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.catChip, selectedCategory === item.id && styles.catChipActive]}
            onPress={() => setSelectedCategory(selectedCategory === item.id ? null : item.id)}
          >
            <Text style={styles.catIcon}>{item.icon}</Text>
            <Text style={[styles.catText, selectedCategory === item.id && styles.catTextActive]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      <FlatList
        data={filtered}
        keyExtractor={(l) => l.id}
        renderItem={renderListing}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>No listings found</Text>}
      />

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CreateListing')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  header: { fontSize: 28, fontWeight: 'bold', color: '#2563EB', paddingHorizontal: 16, paddingTop: 8 },
  search: {
    margin: 16, marginBottom: 8, backgroundColor: '#fff', borderRadius: 12,
    padding: 12, fontSize: 15, borderWidth: 1, borderColor: '#E5E7EB',
  },
  categories: { paddingHorizontal: 16, paddingBottom: 12 },
  catChip: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, marginRight: 8,
    borderWidth: 1, borderColor: '#E5E7EB',
  },
  catChipActive: { backgroundColor: '#2563EB', borderColor: '#2563EB' },
  catIcon: { fontSize: 16, marginRight: 6 },
  catText: { fontSize: 13, color: '#374151' },
  catTextActive: { color: '#fff' },
  list: { padding: 16, paddingTop: 4 },
  card: { backgroundColor: '#fff', borderRadius: 12, marginBottom: 16, overflow: 'hidden', elevation: 2 },
  cardImage: { width: '100%', height: 180 },
  cardBody: { padding: 12 },
  cardTitle: { fontSize: 17, fontWeight: '600', color: '#111827' },
  cardLocation: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  cardPrice: { fontSize: 16, fontWeight: 'bold', color: '#2563EB', marginTop: 6 },
  empty: { textAlign: 'center', color: '#9CA3AF', marginTop: 40, fontSize: 15 },
  fab: {
    position: 'absolute', bottom: 20, right: 20, width: 56, height: 56,
    borderRadius: 28, backgroundColor: '#2563EB', alignItems: 'center',
    justifyContent: 'center', elevation: 4,
  },
  fabText: { color: '#fff', fontSize: 28, lineHeight: 30 },
});
