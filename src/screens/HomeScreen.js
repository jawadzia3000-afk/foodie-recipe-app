import React, { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CategoryChip from '../components/CategoryChip';
import RecipeCard from '../components/RecipeCard';
import { useRecipes } from '../context/RecipeContext';

const ALL = 'All';
const MY_FOOD = 'My Food';

export default function HomeScreen({ navigation }) {
  const { categories, recipes, myRecipes, deleteRecipe } = useRecipes();
  const [selectedCategory, setSelectedCategory] = useState(ALL);

  const chipList = useMemo(() => [ALL, ...categories, MY_FOOD], [categories]);

  const filteredRecipes = useMemo(() => {
    if (selectedCategory === ALL) return recipes;
    if (selectedCategory === MY_FOOD) return [];
    return recipes.filter((r) => r.category === selectedCategory);
  }, [selectedCategory, recipes]);

  const openRecipe = (recipe) => navigation.navigate('RecipeDetail', { recipe });

  const confirmDelete = (recipe) => {
    Alert.alert('Delete Recipe', `Delete "${recipe.name}"? This can't be undone.`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteRecipe(recipe.id) },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Foodie</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Favorites')} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="heart" size={26} color="#FF3B5C" />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipScroll}
        contentContainerStyle={styles.chipContent}
      >
        {chipList.map((cat) => (
          <CategoryChip
            key={cat}
            label={cat}
            active={selectedCategory === cat}
            onPress={() => setSelectedCategory(cat)}
          />
        ))}
      </ScrollView>

      {selectedCategory === MY_FOOD ? (
        <FlatList
          data={myRecipes}
          key="myfood"
          numColumns={1}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <TouchableOpacity style={styles.addRecipeButton} onPress={() => navigation.navigate('AddRecipe')}>
              <Ionicons name="add-circle" size={22} color="#FFFFFF" />
              <Text style={styles.addRecipeText}>Add New Recipe</Text>
            </TouchableOpacity>
          }
          ListEmptyComponent={
            <Text style={styles.emptyText}>You haven't added any recipes yet. Tap "Add New Recipe" to get started!</Text>
          }
          renderItem={({ item }) => (
            <RecipeCard
              recipe={item}
              onPress={() => openRecipe(item)}
              showEditDelete
              onEdit={() => navigation.navigate('EditRecipe', { recipe: item })}
              onDelete={() => confirmDelete(item)}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <FlatList
          data={filteredRecipes}
          key="grid"
          numColumns={2}
          columnWrapperStyle={styles.column}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => <RecipeCard recipe={item} onPress={() => openRecipe(item)} />}
          keyExtractor={(item) => item.id}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF6EE',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#2E2622',
  },
  chipScroll: {
    flexGrow: 0,
    marginBottom: 12,
  },
  chipContent: {
    paddingHorizontal: 20,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  column: {
    justifyContent: 'space-between',
  },
  addRecipeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 16,
  },
  addRecipeText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  emptyText: {
    textAlign: 'center',
    color: '#8A7C74',
    marginTop: 30,
    paddingHorizontal: 20,
  },
});
