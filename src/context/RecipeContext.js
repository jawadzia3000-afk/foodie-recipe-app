import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RECIPES, CATEGORIES } from '../data/recipes';

const FAVORITES_KEY = 'foodie_favorites_v1';
const MY_RECIPES_KEY = 'foodie_my_recipes_v1';

const RecipeContext = createContext(null);

export function RecipeProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [myRecipes, setMyRecipes] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Load persisted data on startup
  useEffect(() => {
    (async () => {
      try {
        const [favRaw, mineRaw] = await Promise.all([
          AsyncStorage.getItem(FAVORITES_KEY),
          AsyncStorage.getItem(MY_RECIPES_KEY),
        ]);
        if (favRaw) setFavorites(JSON.parse(favRaw));
        if (mineRaw) setMyRecipes(JSON.parse(mineRaw));
      } catch (e) {
        console.warn('Failed to load Foodie data', e);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  // Persist favorites whenever they change
  useEffect(() => {
    if (loaded) AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites)).catch(() => {});
  }, [favorites, loaded]);

  // Persist my recipes whenever they change
  useEffect(() => {
    if (loaded) AsyncStorage.setItem(MY_RECIPES_KEY, JSON.stringify(myRecipes)).catch(() => {});
  }, [myRecipes, loaded]);

  const isFavorite = (id) => favorites.some((f) => f.id === id);

  const toggleFavorite = (recipe) => {
    setFavorites((prev) =>
      prev.some((f) => f.id === recipe.id) ? prev.filter((f) => f.id !== recipe.id) : [...prev, recipe]
    );
  };

  const addRecipe = (recipe) => {
    const newRecipe = {
      ...recipe,
      id: `user-${Date.now()}`,
      source: 'user',
      category: 'My Food',
    };
    setMyRecipes((prev) => [newRecipe, ...prev]);
    return newRecipe;
  };

  const updateRecipe = (id, updates) => {
    setMyRecipes((prev) => prev.map((r) => (r.id === id ? { ...r, ...updates } : r)));
    // keep favorites in sync if the edited recipe is favorited
    setFavorites((prev) => prev.map((f) => (f.id === id ? { ...f, ...updates } : f)));
  };

  const deleteRecipe = (id) => {
    setMyRecipes((prev) => prev.filter((r) => r.id !== id));
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  };

  const value = {
    categories: CATEGORIES,
    recipes: RECIPES,
    myRecipes,
    favorites,
    isFavorite,
    toggleFavorite,
    addRecipe,
    updateRecipe,
    deleteRecipe,
  };

  return <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>;
}

export function useRecipes() {
  const ctx = useContext(RecipeContext);
  if (!ctx) throw new Error('useRecipes must be used within a RecipeProvider');
  return ctx;
}
