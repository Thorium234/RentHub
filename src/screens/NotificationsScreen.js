import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MOCK_NOTIFICATIONS = [
  { id: '1', type: 'booking', text: 'Jane wants to book "MacBook Pro 14"', time: '2 hours ago', read: false },
  { id: '2', type: 'booking', text: 'Your booking for "Modern Sofa" was confirmed by Alice', time: '1 day ago', read: true },
  { id: '3', type: 'message', text: 'New message from Bob about "Mountain Bike"', time: '2 days ago', read: true },
  { id: '4', type: 'review', text: 'Charlie left you a 5-star review', time: '3 days ago', read: true },
];

export default function NotificationsScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const icon = (type) => {
    if (type === 'booking') return '📅';
    if (type === 'message') return '💬';
    if (type === 'review') return '⭐';
    return '🔔';
  };

  const renderNotification = ({ item }) => (
    <View style={[styles.card, !item.read && styles.unread]}>
      <Text style={styles.icon}>{icon(item.type)}</Text>
      <View style={styles.cardBody}>
        <Text style={styles.text}>{item.text}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 50 }} />
      </View>

      <FlatList
        data={MOCK_NOTIFICATIONS}
        keyExtractor={(n) => n.id}
        renderItem={renderNotification}
        contentContainerStyle={styles.list}
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
  card: {
    flexDirection: 'row', backgroundColor: '#fff', borderRadius: 12,
    padding: 14, marginBottom: 10, elevation: 1, alignItems: 'flex-start',
  },
  unread: { backgroundColor: '#EFF6FF' },
  icon: { fontSize: 24, marginRight: 12 },
  cardBody: { flex: 1 },
  text: { fontSize: 14, color: '#374151', lineHeight: 20 },
  time: { fontSize: 12, color: '#9CA3AF', marginTop: 4 },
});
