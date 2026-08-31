https://snack.expo.dev/@jawad-zia23/github.com-jawadzia3000-afk-foodie-recipe-app

# Foodie 🍳

A recipe app built with React Native + Expo. Browse recipes by category, view full recipe
details, favorite recipes, and manage your own personal recipes (add / edit / delete).

## Tech stack

- Expo (React Native)
- React Navigation (native stack)
- AsyncStorage (persists favorites and user-created recipes on-device)
- expo-image-picker (upload a recipe photo from the device library)
- @expo/vector-icons (Ionicons)

## Running it

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go, or open in Snack via **Import Git Repository** using this repo's
URL.

## Project structure

```
App.js
src/
  context/RecipeContext.js   # global state: favorites, myRecipes, CRUD actions
  data/recipes.js            # 12 categories, 24 built-in recipes with full details
  components/
    CategoryChip.js
    RecipeCard.js             # heart favorite toggle, edit/delete buttons (My Food)
    RecipeForm.js              # shared Add/Edit form
  screens/
    HomeScreen.js              # main feed: horizontal category bar + recipe grid + My Food
    RecipeDetailScreen.js      # ingredients, instructions, prep time, servings, calories, difficulty
    FavoritesScreen.js
    AddRecipeScreen.js
    EditRecipeScreen.js
```

## Feature checklist

- [x] Main feed with 12 horizontally scrollable categories
- [x] Recipe detail page: ingredients, instructions, prep time, servings, calories, difficulty
- [x] Tapping a category filters the feed to that category
- [x] Heart icon toggles favorite / unfavorite on every recipe card and the detail page
- [x] Favorites screen (accessible via the heart icon in the header)
- [x] "My Food" chip in the categories bar → "Add New Recipe" + list of your recipes
- [x] Add New Recipe form: name, image upload (camera roll or URL), ingredients list,
      step-by-step instructions, Save Recipe button
- [x] New recipes appear immediately in "My Food" / My Recipes
- [x] Tapping a recipe in My Recipes opens the full detail view
- [x] Edit and Delete buttons on every recipe in My Recipes (both functional)
- [x] Functional back button on every inner screen
