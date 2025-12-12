import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { auctions } from '../data/auctions';
import BiddingPanel from '../components/BiddingPanel';
import ChatBox from '../components/ChatBox';
import LiveBadge from '../components/LiveBadge';
import CountdownTimer from '../components/CountdownTimer';
import VideoStream from '../components/VideoStream';
import SellerControls from '../components/SellerControls';
import { usePiP } from '../contexts/PiPContext';

export default function AuctionDetailScreen() {
  const { id } = useLocalSearchParams();
  const auction = auctions.find(a => a.id === id);
  const router = useRouter();
  const { setPiPVideo, pipVideo } = usePiP();
  
  const [currentBid, setCurrentBid] = useState(auction?.currentBid || 0);
  const [bidCount, setBidCount] = useState(auction?.bidCount || 0);
  const [isStreaming, setIsStreaming] = useState(auction?.isLive || false);
  const [isSeller] = useState(false); // Set to true for seller view

  if (!auction) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Auction not found</Text>
      </View>
    );
  }

  const handlePlaceBid = (amount: number) => {
    setCurrentBid(amount);
    setBidCount(bidCount + 1);
  };

  const handleEnablePiP = () => {
    setPiPVideo({
      auctionId: auction.id,
      roomName: `auction-${auction.id}`,
      title: auction.title,
    });
    router.back();
  };

  return (
    <>
      <Stack.Screen options={{ 
        title: auction.title,
        headerRight: () => (
          isStreaming && !pipVideo && (
            <TouchableOpacity onPress={handleEnablePiP} style={styles.pipButton}>
              <Text style={styles.pipText}>PiP</Text>
            </TouchableOpacity>
          )
        ),
      }} />
      <ScrollView style={styles.container}>
        <View style={styles.videoContainer}>
          {isStreaming ? (
            <VideoStream
              roomName={`auction-${auction.id}`}
              identity={isSeller ? `seller-${auction.id}` : `viewer-${Date.now()}`}
              isSeller={isSeller}
            />
          ) : (
            <View style={styles.offlineContainer}>
              <Text style={styles.offlineText}>Stream Offline</Text>
            </View>
          )}
          {isStreaming && (
            <View style={styles.liveBadge}>
              <LiveBadge viewers={auction.viewers} />
            </View>
          )}
          <View style={styles.timer}>
            <CountdownTimer endsAt={auction.endsAt} />
          </View>
        </View>


        <View style={styles.content}>
          {isSeller && (
            <SellerControls
              auctionId={auction.id}
              onGoLive={() => setIsStreaming(true)}
              onEndStream={() => setIsStreaming(false)}
            />
          )}

          <View style={styles.seller}>
            <TouchableOpacity onPress={() => router.push(`/seller/${auction.sellerId}`)}>
              <Text style={styles.sellerName}>{auction.seller}</Text>
              <Text style={styles.category}>{auction.category}</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>{auction.title}</Text>
          <Text style={styles.description}>{auction.description}</Text>

          <BiddingPanel
            currentBid={currentBid}
            bidCount={bidCount}
            onPlaceBid={handlePlaceBid}
          />

          <ChatBox />
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
  videoContainer: {
    position: 'relative',
    width: '100%',
    height: 300,
    backgroundColor: '#000',
  },
  offlineContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  offlineText: {
    color: '#666',
    fontSize: 18,
    fontWeight: '600',
  },
  liveBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  timer: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  pipButton: {
    backgroundColor: '#0066FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 10,
  },
  pipText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    padding: 16,
    gap: 20,
  },
  seller: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sellerName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  category: {
    color: '#888',
    fontSize: 14,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  description: {
    color: '#ccc',
    fontSize: 16,
    lineHeight: 24,
  },
  errorText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
  },
});

