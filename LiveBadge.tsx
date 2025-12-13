import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface LiveBadgeProps {
  viewers: number;
}

export default function LiveBadge({ viewers }: LiveBadgeProps) {
  return (
    <View style={styles.container}>
      <View style={styles.dot} />
      <Text style={styles.text}>LIVE</Text>
      <Text style={styles.viewers}>{viewers.toLocaleString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF3366',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
  },
  text: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  viewers: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '400',
  },
});
