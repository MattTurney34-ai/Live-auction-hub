import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import NotificationItem from '../components/NotificationItem';

const notifications = [
  {
    id: '1',
    type: 'won' as const,
    title: 'Auction Won!',
    message: 'Congratulations! You won the Air Jordan 1 Retro High OG',
    time: '2 minutes ago',
  },
  {
    id: '2',
    type: 'outbid' as const,
    title: 'You\'ve been outbid',
    message: 'Someone placed a higher bid on Rare Holographic Charizard Card',
    time: '15 minutes ago',
  },
  {
    id: '3',
    type: 'starting' as const,
    title: 'Auction Starting Soon',
    message: 'Louis Vuitton Neverfull MM auction starts in 5 minutes',
    time: '1 hour ago',
  },
  {
    id: '4',
    type: 'bid' as const,
    title: 'Bid Placed',
    message: 'Your bid of $1,850 on Vintage Omega Seamaster was successful',
    time: '2 hours ago',
  },
  {
    id: '5',
    type: 'starting' as const,
    title: 'Following Seller Live',
    message: 'CardKingCollector just went live with new items',
    time: '3 hours ago',
  },
];

export default function NotificationsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Notifications</Text>
        <Text style={styles.subtitle}>{notifications.length} new updates</Text>
        
        <View style={styles.list}>
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              type={notification.type}
              title={notification.title}
              message={notification.message}
              time={notification.time}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  content: {
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    color: '#888',
    fontSize: 16,
    marginBottom: 20,
  },
  list: {
    marginTop: 10,
  },
});
