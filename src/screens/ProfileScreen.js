import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfileScreen({ navigation }) {
  const { user, signOut } = useAuth();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.displayName?.[0] || user?.email?.[0]?.toUpperCase() || '?'}</Text>
        </View>
        <Text style={styles.name}>{user?.displayName || 'User'}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.menu}>
        <MenuItem icon="📦" label="My Listings" />
        <MenuItem icon="🔑" label="My Rentals" onPress={() => navigation.navigate('RentalHistory')} />
        <MenuItem icon="🏠" label="Owner Dashboard" onPress={() => navigation.navigate('OwnerDashboard')} />
        <MenuItem icon="🔔" label="Notifications" onPress={() => navigation.navigate('Notifications')} />
        <MenuItem icon="📊" label="Analytics" onPress={() => navigation.navigate('Analytics')} />
        <MenuItem icon="⭐" label="Reviews" />
        <MenuItem icon="✅" label="Verification" onPress={() => navigation.navigate('Verification')} />
        <MenuItem icon="📄" label="Rental Contracts" onPress={() => navigation.navigate('Contract')} />
        <MenuItem icon="⚠️" label="File a Dispute" onPress={() => navigation.navigate('Dispute')} />
        <MenuItem icon="⚙️" label="Settings" />
      </View>

      <TouchableOpacity style={styles.signOutBtn} onPress={signOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

function MenuItem({ icon, label, onPress }) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Text style={styles.menuIcon}>{icon}</Text>
      <Text style={styles.menuLabel}>{label}</Text>
      <Text style={styles.menuArrow}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  header: { alignItems: 'center', paddingVertical: 32, backgroundColor: '#fff' },
  avatar: {
    width: 80, height: 80, borderRadius: 40, backgroundColor: '#DBEAFE',
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: 32, fontWeight: '600', color: '#2563EB' },
  name: { fontSize: 20, fontWeight: '600', color: '#111827', marginTop: 12 },
  email: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  menu: { marginTop: 12, backgroundColor: '#fff', borderRadius: 12, marginHorizontal: 16, overflow: 'hidden' },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', padding: 16,
    borderBottomWidth: 1, borderBottomColor: '#F3F4F6',
  },
  menuIcon: { fontSize: 20, marginRight: 12 },
  menuLabel: { flex: 1, fontSize: 15, color: '#374151' },
  menuArrow: { fontSize: 20, color: '#9CA3AF' },
  signOutBtn: {
    marginHorizontal: 16, marginTop: 24, backgroundColor: '#fff',
    borderRadius: 12, padding: 16, alignItems: 'center',
  },
  signOutText: { color: '#EF4444', fontSize: 16, fontWeight: '500' },
});
