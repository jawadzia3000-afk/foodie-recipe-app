import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

export default function RecipeForm({ initialValue, onSubmit, submitLabel = 'Save Recipe' }) {
  const [name, setName] = useState(initialValue?.name || '');
  const [image, setImage] = useState(initialValue?.image || '');
  const [prepTime, setPrepTime] = useState(initialValue?.prepTime || '');
  const [servings, setServings] = useState(initialValue?.servings ? String(initialValue.servings) : '');
  const [calories, setCalories] = useState(initialValue?.calories ? String(initialValue.calories) : '');
  const [difficulty, setDifficulty] = useState(initialValue?.difficulty || 'Easy');
  const [ingredients, setIngredients] = useState(
    initialValue?.ingredients?.length ? initialValue.ingredients : ['']
  );
  const [instructions, setInstructions] = useState(
    initialValue?.instructions?.length ? initialValue.instructions : ['']
  );

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission needed', 'Please allow photo library access to upload an image.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled && result.assets?.length) {
      setImage(result.assets[0].uri);
    }
  };

  const updateListItem = (list, setList, index, value) => {
    const copy = [...list];
    copy[index] = value;
    setList(copy);
  };

  const addListItem = (list, setList) => setList([...list, '']);

  const removeListItem = (list, setList, index) => {
    if (list.length === 1) return;
    setList(list.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Missing name', 'Please enter a recipe name.');
      return;
    }
    const cleanedIngredients = ingredients.map((i) => i.trim()).filter(Boolean);
    const cleanedInstructions = instructions.map((i) => i.trim()).filter(Boolean);
    if (cleanedIngredients.length === 0) {
      Alert.alert('Missing ingredients', 'Please add at least one ingredient.');
      return;
    }
    if (cleanedInstructions.length === 0) {
      Alert.alert('Missing instructions', 'Please add at least one instruction step.');
      return;
    }

    onSubmit({
      name: name.trim(),
      image: image || 'https://picsum.photos/seed/newrecipe/500/350',
      prepTime: prepTime.trim() || '—',
      servings: Number(servings) || 1,
      calories: Number(calories) || 0,
      difficulty,
      ingredients: cleanedIngredients,
      instructions: cleanedInstructions,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Recipe Name</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Lemon Garlic Pasta"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Image</Text>
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.previewImage} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons name="camera-outline" size={28} color="#8A7C74" />
            <Text style={styles.imagePlaceholderText}>Tap to upload an image</Text>
          </View>
        )}
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Or paste an image URL"
        value={image}
        onChangeText={setImage}
        autoCapitalize="none"
      />

      <View style={styles.row}>
        <View style={styles.rowItem}>
          <Text style={styles.label}>Prep Time</Text>
          <TextInput style={styles.input} placeholder="25 min" value={prepTime} onChangeText={setPrepTime} />
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.label}>Servings</Text>
          <TextInput
            style={styles.input}
            placeholder="4"
            value={servings}
            onChangeText={setServings}
            keyboardType="number-pad"
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.rowItem}>
          <Text style={styles.label}>Calories</Text>
          <TextInput
            style={styles.input}
            placeholder="350"
            value={calories}
            onChangeText={setCalories}
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.label}>Difficulty</Text>
          <View style={styles.difficultyRow}>
            {DIFFICULTIES.map((d) => (
              <TouchableOpacity
                key={d}
                style={[styles.diffChip, difficulty === d && styles.diffChipActive]}
                onPress={() => setDifficulty(d)}
              >
                <Text style={[styles.diffChipText, difficulty === d && styles.diffChipTextActive]}>{d}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <Text style={styles.label}>Ingredients</Text>
      {ingredients.map((item, index) => (
        <View key={index} style={styles.listRow}>
          <TextInput
            style={[styles.input, styles.listInput]}
            placeholder={`Ingredient ${index + 1}`}
            value={item}
            onChangeText={(v) => updateListItem(ingredients, setIngredients, index, v)}
          />
          <TouchableOpacity onPress={() => removeListItem(ingredients, setIngredients, index)}>
            <Ionicons name="close-circle" size={22} color="#C9BDB5" />
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity style={styles.addBtn} onPress={() => addListItem(ingredients, setIngredients)}>
        <Ionicons name="add-circle-outline" size={18} color="#FF6B35" />
        <Text style={styles.addBtnText}>Add Ingredient</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Instructions</Text>
      {instructions.map((item, index) => (
        <View key={index} style={styles.listRow}>
          <TextInput
            style={[styles.input, styles.listInput]}
            placeholder={`Step ${index + 1}`}
            value={item}
            onChangeText={(v) => updateListItem(instructions, setInstructions, index, v)}
            multiline
          />
          <TouchableOpacity onPress={() => removeListItem(instructions, setInstructions, index)}>
            <Ionicons name="close-circle" size={22} color="#C9BDB5" />
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity style={styles.addBtn} onPress={() => addListItem(instructions, setInstructions)}>
        <Ionicons name="add-circle-outline" size={18} color="#FF6B35" />
        <Text style={styles.addBtnText}>Add Step</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>{submitLabel}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 60,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2E2622',
    marginTop: 16,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E4DAD2',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: '#FFFFFF',
  },
  imagePicker: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: 160,
    borderRadius: 12,
  },
  imagePlaceholder: {
    height: 130,
    borderRadius: 12,
    backgroundColor: '#F1E9E4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholderText: {
    marginTop: 6,
    color: '#8A7C74',
    fontSize: 13,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  rowItem: {
    flex: 1,
  },
  difficultyRow: {
    flexDirection: 'row',
    gap: 6,
  },
  diffChip: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#F1E9E4',
  },
  diffChipActive: {
    backgroundColor: '#FF6B35',
  },
  diffChipText: {
    fontSize: 12,
    color: '#6B5E57',
    fontWeight: '600',
  },
  diffChipTextActive: {
    color: '#FFFFFF',
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  listInput: {
    flex: 1,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  addBtnText: {
    color: '#FF6B35',
    fontWeight: '600',
    fontSize: 13,
  },
  saveButton: {
    marginTop: 28,
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
