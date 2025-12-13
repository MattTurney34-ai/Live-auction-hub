import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SellerInfoProps {
  name: string;
  avatar: string;
  rating: number;
  followers: number;
  totalSales: number;
  onFollow?: () => void;
}

export default function SellerInfo({ name, avatar, rating, followers, totalSales, onFollow }: SellerInfoProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Ionicons name="star" size={14} color="#FFB800" />
            <Text style={styles.statText}>{rating}</Text>
          </View>
          <View style={styles.stat}>
            <Ionicons name="people" size={14} color="#888" />
            <Text style={styles.statText}>{followers}</Text>
          </View>
          <View style={styles.stat}>
            <Ionicons name="checkmark-circle" size={14} color="#00CC66" />
            <Text style={styles.statText}>{totalSales}</Text>
          </View>
        </View>
      </View>
      <Pressable style={styles.followButton} onPress={onFollow}>
        <Text style={styles.followText}>Follow</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  info: {
    flex: 1,
  },
  name: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  stats: {
    flexDirection: 'row',
    gap: 12,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    color: '#888',
    fontSize: 13,
  },
  followButton: {
    backgroundColor: '#0066FF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  followText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
