import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

interface SellerControlsProps {
  auctionId: string;
  onGoLive: () => void;
  onEndStream: () => void;
}

export default function SellerControls({ auctionId, onGoLive, onEndStream }: SellerControlsProps) {
  const [isLive, setIsLive] = useState(false);
  const [viewers, setViewers] = useState(0);

  const handleGoLive = () => {
    Alert.alert(
      'Go Live',
      'Are you ready to start your live auction?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Go Live',
          onPress: () => {
            setIsLive(true);
            onGoLive();
            // Simulate viewers joining
            setViewers(Math.floor(Math.random() * 50) + 10);
          },
        },
      ]
    );
  };

  const handleEndStream = () => {
    Alert.alert(
      'End Stream',
      'Are you sure you want to end this live auction?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'End Stream',
          style: 'destructive',
          onPress: () => {
            setIsLive(false);
            setViewers(0);
            onEndStream();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {!isLive ? (
        <TouchableOpacity style={styles.goLiveButton} onPress={handleGoLive}>
          <Text style={styles.buttonText}>🔴 Go Live</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.liveContainer}>
          <View style={styles.liveInfo}>
            <View style={styles.liveBadge}>
              <Text style={styles.liveText}>LIVE</Text>
            </View>
            <Text style={styles.viewerCount}>{viewers} viewers</Text>
          </View>
          <TouchableOpacity style={styles.endButton} onPress={handleEndStream}>
            <Text style={styles.endButtonText}>End Stream</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
  },
  goLiveButton: {
    backgroundColor: '#FF3366',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  liveContainer: {
    gap: 10,
  },
  liveInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  liveBadge: {
    backgroundColor: '#FF3366',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  liveText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  viewerCount: {
    color: '#999',
    fontSize: 14,
  },
  endButton: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  endButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
