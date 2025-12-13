import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { usePiP } from '@/app/contexts/PiPContext';
import { useRouter } from 'expo-router';
import VideoStream from './VideoStream';

const { width } = Dimensions.get('window');

export default function PiPVideo() {
  const { pipVideo, setPiPVideo } = usePiP();
  const router = useRouter();

  if (!pipVideo) return null;

  const handleExpand = () => {
    router.push(`/auction/${pipVideo.auctionId}`);
    setPiPVideo(null);
  };

  const handleClose = () => {
    setPiPVideo(null);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleExpand} style={styles.videoContainer}>
        <VideoStream
          roomName={pipVideo.roomName}
          identity="viewer"
          isSeller={false}
        />
      </TouchableOpacity>
      
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>
          {pipVideo.title}
        </Text>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 80,
    right: 10,
    width: width * 0.4,
    height: width * 0.6,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    zIndex: 1000,
  },
  videoContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  title: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  closeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
