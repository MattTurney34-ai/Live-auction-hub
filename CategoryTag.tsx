import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

interface CategoryTagProps {
  category: string;
  isActive?: boolean;
  onPress?: () => void;
}

export default function CategoryTag({ category, isActive, onPress }: CategoryTagProps) {
  return (
    <Pressable
      style={[styles.tag, isActive && styles.activeTag]}
      onPress={onPress}
    >
      <Text style={[styles.text, isActive && styles.activeText]}>{category}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#2a2a2a',
    borderWidth: 1,
    borderColor: '#3a3a3a',
  },
  activeTag: {
    backgroundColor: '#0066FF',
    borderColor: '#0066FF',
  },
  text: {
    color: '#888',
    fontSize: 14,
    fontWeight: '600',
  },
  activeText: {
    color: '#fff',
  },
});
