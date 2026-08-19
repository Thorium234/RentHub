import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ChatScreen({ route, navigation }) {
  const { listing } = route.params;
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState([
    { id: '1', sender: 'owner', text: `Hi! Thanks for your interest in "${listing.title}". How can I help?` },
  ]);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { id: Date.now().toString(), sender: 'me', text: input.trim() }]);
    setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: 'owner', text: getOwnerReply(input.trim()) },
      ]);
    }, 800);
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.bubble, item.sender === 'me' ? styles.mine : styles.theirs]}>
      <Text style={[styles.bubbleText, item.sender === 'me' && styles.mineText]}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.ownerName}>{listing.owner.name}</Text>
          <Text style={styles.listingTitle}>{listing.title}</Text>
        </View>
        <View style={{ width: 50 }} />
      </View>

      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <FlatList
          data={messages}
          keyExtractor={(m) => m.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messages}
        />

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={input}
            onChangeText={setInput}
            onSubmitEditing={send}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={send}>
            <Text style={styles.sendText}>→</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function getOwnerReply(msg) {
  const lower = msg.toLowerCase();
  if (lower.includes('available') || lower.includes('free')) return 'Yes, it is available!';
  if (lower.includes('price') || lower.includes('cost') || lower.includes('much')) return 'Check the listing for the current price.';
  if (lower.includes('location') || lower.includes('where')) return 'Check the listing for the location details.';
  if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey')) return 'Hey! What would you like to know?';
  return 'Thanks for your message! I\'ll get back to you soon.';
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  flex: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E5E7EB',
  },
  back: { fontSize: 16, color: '#2563EB', fontWeight: '500' },
  headerCenter: { alignItems: 'center' },
  ownerName: { fontSize: 16, fontWeight: '600', color: '#111827' },
  listingTitle: { fontSize: 12, color: '#6B7280' },
  messages: { padding: 16, paddingBottom: 8 },
  bubble: {
    maxWidth: '75%', padding: 12, borderRadius: 16, marginBottom: 8,
  },
  mine: { alignSelf: 'flex-end', backgroundColor: '#2563EB', borderBottomRightRadius: 4 },
  theirs: { alignSelf: 'flex-start', backgroundColor: '#F3F4F6', borderBottomLeftRadius: 4 },
  bubbleText: { fontSize: 15, color: '#374151' },
  mineText: { color: '#fff' },
  inputRow: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12,
    paddingVertical: 8, borderTopWidth: 1, borderTopColor: '#E5E7EB',
  },
  input: {
    flex: 1, borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 20,
    paddingHorizontal: 16, paddingVertical: 10, fontSize: 15, backgroundColor: '#F9FAFB',
  },
  sendBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#2563EB',
    alignItems: 'center', justifyContent: 'center', marginLeft: 8,
  },
  sendText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});
