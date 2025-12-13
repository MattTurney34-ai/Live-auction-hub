import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { auctions } from '../data/auctions';
import AuctionCard from '../components/AuctionCard';

export default function SellerScreen() {
  const { id } = useLocalSearchParams();
  const sellerName = id as string;
  
  const sellerAuctions = auctions.filter(a => a.seller === sellerName);
  const seller = sellerAuctions[0];

  if (!seller) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Seller not found</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: seller.seller }} />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image source={{ uri: seller.sellerAvatar }} style={styles.avatar} />
          <Text style={styles.name}>{seller.seller}</Text>
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>4.8</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>1.2k</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>342</Text>
              <Text style={styles.statLabel}>Sales</Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Active Auctions</Text>
          {sellerAuctions.map((auction) => (
            <AuctionCard key={auction.id} auction={auction} />
          ))}
        </View>
      </ScrollView>
    </>
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
  content: {
    padding: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  errorText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
  },
});
