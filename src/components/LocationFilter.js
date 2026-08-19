import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { COUNTIES } from '../data/mockData';

export default function LocationFilter({ selected, onSelect }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={[styles.chip, !selected && styles.chipActive]}
        onPress={() => onSelect(null)}
      >
        <Text style={[styles.chipText, !selected && styles.chipTextActive]}>All</Text>
      </TouchableOpacity>
      {COUNTIES.map((county) => (
        <TouchableOpacity
          key={county}
          style={[styles.chip, selected === county && styles.chipActive]}
          onPress={() => onSelect(selected === county ? null : county)}
        >
          <Text style={[styles.chipText, selected === county && styles.chipTextActive]}>{county}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingBottom: 8 },
  chip: {
    backgroundColor: '#fff', borderRadius: 16, paddingHorizontal: 14,
    paddingVertical: 6, marginRight: 8, borderWidth: 1, borderColor: '#E5E7EB',
  },
  chipActive: { backgroundColor: '#2563EB', borderColor: '#2563EB' },
  chipText: { fontSize: 13, color: '#374151' },
  chipTextActive: { color: '#fff' },
});
