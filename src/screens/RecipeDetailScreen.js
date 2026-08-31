import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRecipes } from '../context/RecipeContext';

export default function RecipeDetailScreen({ route, navigation }) {
  const { recipe } = route.params;
  const { isFavorite, toggleFavorite } = useRecipes();
  const favorited = isFavorite(recipe.id);

  return (
    <View style={styles.flex}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: recipe.image }} style={styles.image} />

          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="arrow-back" size={22} color="#2E2622" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.heartButton} onPress={() => toggleFavorite(recipe)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name={favorited ? 'heart' : 'heart-outline'} size={24} color={favorited ? '#FF3B5C' : '#2E2622'} />
          </TouchableOpacity>
        </View>

        <View style={styles.body}>
          <Text style={styles.name}>{recipe.name}</Text>
          <Text style={styles.category}>{recipe.category}</Text>

          <View style={styles.statsRow}>
            <Stat icon="time-outline" label={recipe.prepTime} caption="Prep Time" />
            <Stat icon="people-outline" label={String(recipe.servings)} caption="Servings" />
            <Stat icon="flame-outline" label={`${recipe.calories} kcal`} caption="Calories" />
            <Stat icon="speedometer-outline" label={recipe.difficulty} caption="Difficulty" />
          </View>

          <Text style={styles.sectionTitle}>Ingredients</Text>
          {recipe.ingredients.map((item, index) => (
            <View key={index} style={styles.bulletRow}>
              <View style={styles.bullet} />
              <Text style={styles.bulletText}>{item}</Text>
            </View>
          ))}

          <Text style={styles.sectionTitle}>Instructions</Text>
          {recipe.instructions.map((step, index) => (
            <View key={index} style={styles.stepRow}>
              <View style={styles.stepNumberCircle}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function Stat({ icon, label, caption }) {
  return (
    <View style={styles.statItem}>
      <Ionicons name={icon} size={18} color="#FF6B35" />
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statCaption}>{caption}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 260,
    backgroundColor: '#eee',
  },
  backButton: {
    position: 'absolute',
    top: 48,
    left: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 8,
    elevation: 3,
  },
  heartButton: {
    position: 'absolute',
    top: 48,
    right: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 8,
    elevation: 3,
  },
  body: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2E2622',
  },
  category: {
    marginTop: 4,
    fontSize: 13,
    color: '#8A7C74',
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF6EE',
    borderRadius: 14,
    paddingVertical: 14,
    marginTop: 18,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    marginTop: 4,
    fontWeight: '700',
    fontSize: 13,
    color: '#2E2622',
  },
  statCaption: {
    fontSize: 10,
    color: '#8A7C74',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2E2622',
    marginTop: 26,
    marginBottom: 10,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF6B35',
    marginRight: 10,
  },
  bulletText: {
    fontSize: 14,
    color: '#463C36',
    flex: 1,
  },
  stepRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  stepNumberCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF6B35',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  stepText: {
    fontSize: 14,
    color: '#463C36',
    flex: 1,
    lineHeight: 20,
  },
});
