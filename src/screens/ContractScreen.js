import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ContractScreen({ route, navigation }) {
  const { booking } = route.params || {};
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rental Agreement</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.title}>RENTAL AGREEMENT</Text>
        <Text style={styles.date}>Date: {new Date().toISOString().split('T')[0]}</Text>

        <View style={styles.divider} />

        <Text style={styles.heading}>1. Parties</Text>
        <Text style={styles.text}>This agreement is between the Owner and the Customer for the rental of the listed item through RentHub.</Text>

        <Text style={styles.heading}>2. Item</Text>
        <Text style={styles.text}>{booking?.listingTitle || 'Rental Item'}</Text>

        <Text style={styles.heading}>3. Rental Period</Text>
        <Text style={styles.text}>Start: {booking?.startDate || 'TBD'}</Text>
        <Text style={styles.text}>End: {booking?.endDate || 'TBD'}</Text>

        <Text style={styles.heading}>4. Total Cost</Text>
        <Text style={styles.text}>KES {booking?.totalPrice || '0'}</Text>

        <Text style={styles.heading}>5. Terms</Text>
        <Text style={styles.text}>The item must be returned in the same condition as received. The Customer is responsible for any damage during the rental period. Late returns may incur additional charges as agreed between both parties.</Text>

        <Text style={styles.heading}>6. Condition</Text>
        <Text style={styles.text}>Both parties should document the item's condition before and after the rental period.</Text>

        <View style={styles.divider} />

        <Text style={styles.note}>This is a simplified agreement template. Both parties should read and understand all terms before proceeding.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E5E7EB',
  },
  back: { fontSize: 16, color: '#2563EB' },
  headerTitle: { fontSize: 17, fontWeight: '600', color: '#111827' },
  body: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#111827', textAlign: 'center' },
  date: { fontSize: 13, color: '#6B7280', textAlign: 'center', marginTop: 6 },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 16 },
  heading: { fontSize: 15, fontWeight: '600', color: '#111827', marginTop: 12, marginBottom: 4 },
  text: { fontSize: 14, color: '#4B5563', lineHeight: 20 },
  note: { fontSize: 12, color: '#9CA3AF', fontStyle: 'italic', lineHeight: 18 },
});
