import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { supabase } from '@/app/lib/supabase';

interface VideoStreamProps {
  roomName: string;
  identity: string;
  isSeller?: boolean;
  onError?: (error: string) => void;
}

export default function VideoStream({ roomName, identity, isSeller = false, onError }: VideoStreamProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    connectToRoom();
    return () => {
      // Cleanup video connection
    };
  }, [roomName, identity]);

  const connectToRoom = async () => {
    try {
      setLoading(true);
      
      const { data, error: tokenError } = await supabase.functions.invoke('create-video-token', {
        body: { roomName, identity, isSeller },
      });

      if (tokenError) throw tokenError;

      // Note: Actual Twilio Video SDK integration would happen here
      // For now, simulating connection
      setTimeout(() => {
        setConnected(true);
        setLoading(false);
      }, 1500);

    } catch (err: any) {
      setError(err.message || 'Failed to connect');
      setLoading(false);
      onError?.(err.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0066FF" />
        <Text style={styles.loadingText}>Connecting to stream...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>⚠️ {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.videoPlaceholder}>
        <Text style={styles.liveText}>🔴 LIVE</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 14,
  },
  errorText: {
    color: '#FF3366',
    fontSize: 14,
    textAlign: 'center',
    padding: 20,
  },
  videoPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  liveText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
