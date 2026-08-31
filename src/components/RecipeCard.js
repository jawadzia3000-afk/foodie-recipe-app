import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRecipes } from '../context/RecipeContext';

export default function RecipeCard({ recipe, onPress, showEditDelete, onEdit, onDelete }) {
  const { isFavorite, toggleFavorite } = useRecipes();
  const favorited = isFavorite(recipe.id);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Image source={{ uri: recipe.image }} style={styles.image} />
      <TouchableOpacity
        style={styles.heartButton}
        onPress={() => toggleFavorite(recipe)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name={favorited ? 'heart' : 'heart-outline'} size={22} color={favorited ? '#FF3B5C' : '#FFFFFF'} />
      </TouchableOpacity>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{recipe.name}</Text>
        <Text style={styles.meta}>{recipe.prepTime} · {recipe.difficulty}</Text>

        {showEditDelete && (
          <View style={styles.actionsRow}>
            <TouchableOpacity style={[styles.actionBtn, styles.editBtn]} onPress={onEdit}>
              <Ionicons name="create-outline" size={16} color="#FFFFFF" />
              <Text style={styles.actionText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, styles.deleteBtn]} onPress={onDelete}>
              <Ionicons name="trash-outline" size={16} color="#FFFFFF" />
              <Text style={styles.actionText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 220,
    marginRight: 14,
    marginBottom: 14,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  image: {
    width: '100%',
    height: 130,
    backgroundColor: '#eee',
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 16,
    padding: 6,
  },
  info: {
    padding: 10,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2E2622',
  },
  meta: {
    marginTop: 4,
    fontSize: 12,
    color: '#8A7C74',
  },
  actionsRow: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 8,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    gap: 4,
  },
  editBtn: {
    backgroundColor: '#3E8EDE',
  },
  deleteBtn: {
    backgroundColor: '#E5484D',
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
