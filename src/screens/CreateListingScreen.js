import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CATEGORIES } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

export default function CreateListingScreen({ navigation }) {
  const { user } = useAuth();
  const insets = useSafeAreaInsets();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(null);
  const [location, setLocation] = useState('');

  const handlePublish = () => {
    if (!title.trim() || !price.trim() || !category || !location.trim()) {
      Alert.alert('Missing fields', 'Please fill in title, price, category, and location.');
      return;
    }
    Alert.alert('Listing Created', `"${title}" has been published!`, [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Listing</Text>
        <TouchableOpacity onPress={handlePublish}>
          <Text style={styles.publish}>Publish</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.form}>
        <Label text="Title" />
        <TextInput style={styles.input} placeholder="e.g. Wedding Tent" value={title} onChangeText={setTitle} />

        <Label text="Description" />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe your item..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />

        <Label text="Price (KES)" />
        <View style={styles.priceRow}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Amount"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
          <Text style={styles.perDay}>/ day</Text>
        </View>

        <Label text="Category" />
        <View style={styles.catGrid}>
          {CATEGORIES.map((c) => (
            <TouchableOpacity
              key={c.id}
              style={[styles.catBtn, category === c.id && styles.catBtnActive]}
              onPress={() => setCategory(c.id)}
            >
              <Text style={styles.catIcon}>{c.icon}</Text>
              <Text style={[styles.catLabel, category === c.id && styles.catLabelActive]}>{c.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Label text="Location" />
        <TextInput
          style={styles.input}
          placeholder="e.g. Kakamega, Milimani"
          value={location}
          onChangeText={setLocation}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function Label({ text }) {
  return <Text style={styles.label}>{text}</Text>;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E5E7EB',
  },
  back: { fontSize: 16, color: '#6B7280' },
  headerTitle: { fontSize: 17, fontWeight: '600', color: '#111827' },
  publish: { fontSize: 16, color: '#2563EB', fontWeight: '600' },
  form: { padding: 16 },
  label: { fontSize: 14, fontWeight: '600', color: '#374151', marginTop: 16, marginBottom: 6 },
  input: {
    borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 12,
    padding: 14, fontSize: 15, backgroundColor: '#F9FAFB',
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  priceRow: { flexDirection: 'row', alignItems: 'center' },
  perDay: { fontSize: 15, color: '#6B7280', marginLeft: 10 },
  catGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  catBtn: {
    flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#D1D5DB',
    borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, backgroundColor: '#F9FAFB',
  },
  catBtnActive: { backgroundColor: '#2563EB', borderColor: '#2563EB' },
  catIcon: { fontSize: 14, marginRight: 6 },
  catLabel: { fontSize: 13, color: '#374151' },
  catLabelActive: { color: '#fff' },
});
