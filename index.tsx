import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { auctions } from '../data/auctions';
import AuctionCard from '../components/AuctionCard';
import SearchBar from '../components/SearchBar';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const liveAuctions = auctions.filter(a => a.isLive);
  
  const filteredAuctions = liveAuctions.filter(auction =>
    auction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    auction.seller.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: 'https://d64gsuwffb70l.cloudfront.net/69273d0f6fd0fdc0bff0fe5b_1764179332155_f513aec3.webp' }}
        style={styles.hero}
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>Live Auctions</Text>
        <Text style={styles.subtitle}>
          {liveAuctions.length} auctions happening now
        </Text>
        
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search live auctions..."
        />

        <View style={styles.grid}>
          {filteredAuctions.map((auction) => (
            <AuctionCard key={auction.id} auction={auction} />
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
  hero: {
    width: '100%',
    height: 200,
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
  grid: {
    marginTop: 20,
  },
});
