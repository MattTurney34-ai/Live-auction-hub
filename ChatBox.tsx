import React, { useState } from 'react';
import { View, ScrollView, TextInput, Pressable, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ChatMessage from './ChatMessage';

const initialMessages = [
  { id: '1', username: 'BidMaster', message: 'Great item!', isBid: false },
  { id: '2', username: 'Collector99', message: 'placed a bid of $850', isBid: true },
  { id: '3', username: 'AuctionFan', message: 'Still available?', isBid: false },
  { id: '4', username: 'ProBidder', message: 'placed a bid of $875', isBid: true },
];

export default function ChatBox() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, {
        id: Date.now().toString(),
        username: 'You',
        message: input,
        isBid: false,
      }]);
      setInput('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Live Chat</Text>
      <ScrollView style={styles.messages}>
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            username={msg.username}
            message={msg.message}
            isBid={msg.isBid}
          />
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
          placeholderTextColor="#666"
        />
        <Pressable style={styles.sendButton} onPress={handleSend}>
          <Ionicons name="send" size={20} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    height: 400,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  messages: {
    flex: 1,
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 14,
  },
  sendButton: {
    backgroundColor: '#0066FF',
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
