import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useReviews } from '../context/ReviewsContext';
import { useAuth } from '../context/AuthContext';

export default function WriteReviewScreen({ route, navigation }) {
  const { ownerName, ownerId } = route.params;
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const { addReview } = useReviews();
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert('Select rating', 'Tap a star to rate.');
      return;
    }
    addReview({ ownerId, ownerName, reviewerName: user.displayName || user.email, rating, text });
    Alert.alert('Review Posted', `You rated ${ownerName} ${rating}/5 stars.`, [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rate {ownerName}</Text>
        <View style={{ width: 50 }} />
      </View>

      <View style={styles.body}>
        <Text style={styles.label}>Rating</Text>
        <View style={styles.stars}>
          {[1, 2, 3, 4, 5].map((s) => (
            <TouchableOpacity key={s} onPress={() => setRating(s)}>
              <Text style={styles.star}>{s <= rating ? '⭐' : '☆'}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Review</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Share your experience..."
          value={text}
          onChangeText={setText}
          multiline
          numberOfLines={5}
        />

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>Post Review</Text>
        </TouchableOpacity>
      </View>
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
  body: { padding: 16 },
  label: { fontSize: 14, fontWeight: '600', color: '#374151', marginTop: 16, marginBottom: 8 },
  stars: { flexDirection: 'row', gap: 8 },
  star: { fontSize: 32 },
  textArea: {
    borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 12,
    padding: 14, fontSize: 15, height: 120, textAlignVertical: 'top', backgroundColor: '#F9FAFB',
  },
  submitBtn: {
    backgroundColor: '#2563EB', borderRadius: 12, padding: 16,
    alignItems: 'center', marginTop: 24,
  },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
