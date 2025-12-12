import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=68' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>John Collector</Text>
        <Text style={styles.username}>@johncollector</Text>
        
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>127</Text>
            <Text style={styles.statLabel}>Wins</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>2.4k</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>4.8</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.menuItem}>
          <Ionicons name="person-outline" size={24} color="#888" />
          <Text style={styles.menuText}>Edit Profile</Text>
        </View>
        <View style={styles.menuItem}>
          <Ionicons name="card-outline" size={24} color="#888" />
          <Text style={styles.menuText}>Payment Methods</Text>
        </View>
        <View style={styles.menuItem}>
          <Ionicons name="notifications-outline" size={24} color="#888" />
          <Text style={styles.menuText}>Notifications</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Activity</Text>
        <View style={styles.menuItem}>
          <Ionicons name="hammer-outline" size={24} color="#888" />
          <Text style={styles.menuText}>My Bids</Text>
        </View>
        <View style={styles.menuItem}>
          <Ionicons name="trophy-outline" size={24} color="#888" />
          <Text style={styles.menuText}>Won Auctions</Text>
        </View>
        <View style={styles.menuItem}>
          <Ionicons name="heart-outline" size={24} color="#888" />
          <Text style={styles.menuText}>Watchlist</Text>
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
  header: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#1a1a1a',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  username: {
    color: '#888',
    fontSize: 16,
    marginBottom: 24,
  },
  stats: {
    flexDirection: 'row',
    gap: 40,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    color: '#0066FF',
    fontSize: 24,
    fontWeight: '700',
  },
  statLabel: {
    color: '#888',
    fontSize: 14,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    gap: 12,
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
  },
});
