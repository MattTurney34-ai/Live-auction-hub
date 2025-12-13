import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ChatMessageProps {
  username: string;
  message: string;
  isBid?: boolean;
}

export default function ChatMessage({ username, message, isBid }: ChatMessageProps) {
  return (
    <View style={styles.container}>
      <Text style={[styles.username, isBid && styles.bidUsername]}>{username}</Text>
      <Text style={[styles.message, isBid && styles.bidMessage]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 6,
    gap: 8,
  },
  username: {
    color: '#0066FF',
    fontSize: 14,
    fontWeight: '600',
  },
  bidUsername: {
    color: '#00CC66',
  },
  message: {
    color: '#ccc',
    fontSize: 14,
    flex: 1,
  },
  bidMessage: {
    color: '#00CC66',
    fontWeight: '600',
  },
});
