import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput, Alert } from 'react-native';

interface BiddingPanelProps {
  currentBid: number;
  bidCount: number;
  onPlaceBid: (amount: number) => void;
}

export default function BiddingPanel({ currentBid, bidCount, onPlaceBid }: BiddingPanelProps) {
  const [customBid, setCustomBid] = useState('');
  const quickBids = [10, 25, 50, 100];

  const handleQuickBid = (increment: number) => {
    const newBid = currentBid + increment;
    onPlaceBid(newBid);
    Alert.alert('Bid Placed!', `Your bid of $${newBid} has been placed.`);
  };

  const handleCustomBid = () => {
    const amount = parseFloat(customBid);
    if (amount > currentBid) {
      onPlaceBid(amount);
      Alert.alert('Bid Placed!', `Your bid of $${amount} has been placed.`);
      setCustomBid('');
    } else {
      Alert.alert('Invalid Bid', 'Bid must be higher than current bid.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.label}>Current Bid</Text>
          <Text style={styles.currentBid}>${currentBid}</Text>
        </View>
        <Text style={styles.bidCount}>{bidCount} bids</Text>
      </View>

      <View style={styles.quickBids}>
        {quickBids.map((increment) => (
          <Pressable
            key={increment}
            style={styles.quickBidButton}
            onPress={() => handleQuickBid(increment)}
          >
            <Text style={styles.quickBidText}>+${increment}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.customBid}>
        <TextInput
          style={styles.input}
          value={customBid}
          onChangeText={setCustomBid}
          placeholder="Enter custom bid"
          placeholderTextColor="#666"
          keyboardType="numeric"
        />
        <Pressable style={styles.bidButton} onPress={handleCustomBid}>
          <Text style={styles.bidButtonText}>Place Bid</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    color: '#666',
    fontSize: 12,
    marginBottom: 4,
  },
  currentBid: {
    color: '#0066FF',
    fontSize: 28,
    fontWeight: '700',
  },
  bidCount: {
    color: '#888',
    fontSize: 14,
  },
  quickBids: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  quickBidButton: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  quickBidText: {
    color: '#00CC66',
    fontSize: 16,
    fontWeight: '600',
  },
  customBid: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  bidButton: {
    backgroundColor: '#0066FF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  bidButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
