import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { auctions, categories } from '../data/auctions';
import AuctionCard from '../components/AuctionCard';
import CategoryTag from '../components/CategoryTag';
import SearchBar from '../components/SearchBar';

export default function BrowseScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAuctions = auctions.filter(auction => {
    const matchesCategory = selectedCategory === 'All' || auction.category === selectedCategory;
    const matchesSearch = auction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         auction.seller.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Browse Auctions</Text>
        <Text style={styles.subtitle}>{auctions.length} total auctions</Text>
        
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categories}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <CategoryTag
              key={category}
              category={category}
              isActive={selectedCategory === category}
              onPress={() => setSelectedCategory(category)}
            />
          ))}
        </ScrollView>

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
  categories: {
    marginVertical: 20,
  },
  categoriesContent: {
    gap: 8,
  },
  grid: {
    marginTop: 10,
  },
});
