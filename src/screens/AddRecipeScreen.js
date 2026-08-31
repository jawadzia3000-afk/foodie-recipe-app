import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RecipeForm from '../components/RecipeForm';
import { useRecipes } from '../context/RecipeContext';

export default function AddRecipeScreen({ navigation }) {
  const { addRecipe } = useRecipes();

  const handleSubmit = (data) => {
    addRecipe(data);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="arrow-back" size={24} color="#2E2622" />
        </TouchableOpacity>
        <Text style={styles.title}>Add New Recipe</Text>
        <View style={{ width: 24 }} />
      </View>
      <RecipeForm onSubmit={handleSubmit} submitLabel="Save Recipe" />
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2E2622',
  },
});
