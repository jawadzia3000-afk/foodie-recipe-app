import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function CategoryChip({ label, active, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.chip, active && styles.chipActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.label, active && styles.labelActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F1E9E4',
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: '#FF6B35',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B5E57',
  },
  labelActive: {
    color: '#FFFFFF',
  },
});
