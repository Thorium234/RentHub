import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function VerificationScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [status, setStatus] = useState('unverified');

  const handleUpload = (type) => {
    Alert.alert('ID Uploaded', `Your ${type} has been submitted for verification.`, [
      { text: 'OK', onPress: () => setStatus('pending') },
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Verification</Text>
        <View style={{ width: 50 }} />
      </View>

      <View style={styles.body}>
        <View style={styles.statusCard}>
          <Text style={styles.statusIcon}>{status === 'verified' ? '✅' : status === 'pending' ? '⏳' : '🔓'}</Text>
          <Text style={styles.statusText}>
            {status === 'verified' ? 'Verified' : status === 'pending' ? 'Verification Pending' : 'Not Verified'}
          </Text>
          <Text style={styles.statusDesc}>
            {status === 'verified'
              ? 'Your identity has been confirmed.'
              : status === 'pending'
              ? 'We are reviewing your ID. This usually takes 1-2 days.'
              : 'Verify your identity to build trust with other users.'}
          </Text>
        </View>

        {status === 'unverified' && (
          <View style={styles.options}>
            <Text style={styles.label}>Upload ID Document</Text>
            <TouchableOpacity style={styles.optionBtn} onPress={() => handleUpload('National ID')}>
              <Text style={styles.optionIcon}>🪪</Text>
              <Text style={styles.optionText}>National ID</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionBtn} onPress={() => handleUpload('Passport')}>
              <Text style={styles.optionIcon}>📘</Text>
              <Text style={styles.optionText}>Passport</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionBtn} onPress={() => handleUpload('Driver License')}>
              <Text style={styles.optionIcon}>🚗</Text>
              <Text style={styles.optionText}>Driver License</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
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
  body: { padding: 16 },
  statusCard: {
    backgroundColor: '#fff', borderRadius: 12, padding: 24, alignItems: 'center', marginBottom: 20,
  },
  statusIcon: { fontSize: 40, marginBottom: 8 },
  statusText: { fontSize: 18, fontWeight: '600', color: '#111827' },
  statusDesc: { fontSize: 14, color: '#6B7280', textAlign: 'center', marginTop: 6, lineHeight: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 10 },
  optionBtn: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    borderRadius: 12, padding: 16, marginBottom: 8,
  },
  optionIcon: { fontSize: 24, marginRight: 12 },
  optionText: { fontSize: 15, color: '#374151' },
});
