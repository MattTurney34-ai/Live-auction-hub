import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Auction } from '../data/auctions';
import LiveBadge from './LiveBadge';
import CountdownTimer from './CountdownTimer';

interface AuctionCardProps {
  auction: Auction;
}

export default function AuctionCard({ auction }: AuctionCardProps) {
  const router = useRouter();

  return (
    <Pressable
      style={styles.card}
      onPress={() => router.push(`/auction/${auction.id}`)}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: auction.image }} style={styles.image} />
        {auction.isLive && (
          <View style={styles.liveBadge}>
            <LiveBadge viewers={auction.viewers} />
          </View>
        )}
        <View style={styles.timer}>
          <CountdownTimer endsAt={auction.endsAt} />
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{auction.title}</Text>
        <View style={styles.seller}>
          <Image source={{ uri: auction.sellerAvatar }} style={styles.avatar} />
          <Text style={styles.sellerName}>{auction.seller}</Text>
        </View>
        <View style={styles.footer}>
          <View>
            <Text style={styles.label}>Current Bid</Text>
            <Text style={styles.price}>${auction.currentBid}</Text>
          </View>
          <Text style={styles.bids}>{auction.bidCount} bids</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  liveBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
  },
  timer: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  content: {
    padding: 12,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  seller: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 6,
  },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  sellerName: {
    color: '#888',
    fontSize: 13,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  label: {
    color: '#666',
    fontSize: 11,
    marginBottom: 2,
  },
  price: {
    color: '#0066FF',
    fontSize: 20,
    fontWeight: '700',
  },
  bids: {
    color: '#888',
    fontSize: 13,
  },
});
