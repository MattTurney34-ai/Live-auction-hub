import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface NotificationItemProps {
  type: 'bid' | 'outbid' | 'won' | 'starting';
  title: string;
  message: string;
  time: string;
}

export default function NotificationItem({ type, title, message, time }: NotificationItemProps) {
  const getIcon = () => {
    switch (type) {
      case 'bid': return 'hammer';
      case 'outbid': return 'alert-circle';
      case 'won': return 'trophy';
      case 'starting': return 'play-circle';
      default: return 'notifications';
    }
  };

  const getColor = () => {
    switch (type) {
      case 'bid': return '#0066FF';
      case 'outbid': return '#FF3366';
      case 'won': return '#00CC66';
      case 'starting': return '#0066FF';
      default: return '#888';
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: getColor() + '20' }]}>
        <Ionicons name={getIcon()} size={24} color={getColor()} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  message: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 4,
  },
  time: {
    color: '#666',
    fontSize: 12,
  },
});
