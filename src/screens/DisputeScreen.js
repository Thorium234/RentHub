import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const REASONS = ['Item not as described', 'Item damaged', 'Late return', 'Owner unresponsive', 'Safety concern', 'Other'];

export default function DisputeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [reason, setReason] = useState(null);
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!reason) {
      Alert.alert('Select reason', 'Please choose a reason for the dispute.');
      return;
    }
    Alert.alert('Dispute Filed', 'Your dispute has been submitted. Our team will review it within 48 hours.', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>File a Dispute</Text>
        <View style={{ width: 50 }} />
      </View>

      <View style={styles.body}>
        <Text style={styles.label}>Reason</Text>
        {REASONS.map((r) => (
          <TouchableOpacity
            key={r}
            style={[styles.optionBtn, reason === r && styles.optionActive]}
            onPress={() => setReason(r)}
          >
            <Text style={[styles.optionText, reason === r && styles.optionTextActive]}>{r}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Describe the issue..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={5}
        />

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit Dispute</Text>
        </TouchableOpacity>
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
  label: { fontSize: 14, fontWeight: '600', color: '#374151', marginTop: 8, marginBottom: 8 },
  optionBtn: {
    backgroundColor: '#fff', borderRadius: 10, padding: 14, marginBottom: 6, borderWidth: 1, borderColor: '#E5E7EB',
  },
  optionActive: { backgroundColor: '#EFF6FF', borderColor: '#2563EB' },
  optionText: { fontSize: 14, color: '#374151' },
  optionTextActive: { color: '#2563EB', fontWeight: '600' },
  textArea: {
    borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 12,
    padding: 14, fontSize: 15, height: 120, textAlignVertical: 'top', backgroundColor: '#fff',
  },
  submitBtn: {
    backgroundColor: '#EF4444', borderRadius: 12, padding: 16,
    alignItems: 'center', marginTop: 24,
  },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
