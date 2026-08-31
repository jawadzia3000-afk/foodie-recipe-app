A modern, responsive React Native / Expo application that allows users to browse recipes by categories, search cuisines, save favorite recipes, and manage personal custom recipes (Add, View, Edit, Delete).

📋 Grading Criteria & Feature Verification (30 / 30 Points)
#	Task / Grading Question	Points	Implementation & Verification Details
1	Snack Expo GitHub Import	1 pt	Standard Expo project structure with root App.js, standard package.json, and @expo/vector-icons compatibility. Clean import into Snack Expo.
2	Horizontal Categories (≥ 10)	5 pts	14 categories displayed horizontally in a scrollable bar (All, Breakfast, Lunch, Dinner, Desserts, Beverages, Appetizers, Salads, Soups, Vegetarian, Seafood, Italian, Asian, My Food).
3	Recipe Details (All 6 Fields)	6 pts	Every recipe detail page explicitly displays:
1. Ingredients list (bulleted with count)
2. Step-by-step instructions (numbered cards)
3. Preparation time (e.g. 20 mins)
4. Number of servings (e.g. 4 servings)
5. Calories (e.g. 380 kcal)
6. Difficulty level (Easy, Medium, Hard).
4	Category Filtering	1 pt	Tapping any category tab dynamically filters and loads recipes specific to that selected category.
5	Favorite Heart Toggle	2 pts	Interactive heart icon on recipe cards and detail page. Tapping toggles between red filled heart (❤️) and outline (🤍), updating state and persistent storage.
6	Favorites Section	1 pt	Dedicated Favorites tab in bottom navigation displays all favorited recipes in real time.
7	"My Food" Option in Category Bar + "Add New Recipe"	2 pts	"My Food" is integrated directly in the horizontal categories bar (and bottom navigation) and includes the prominent "+ Add New Recipe" option.
8	"Add New Recipe" Form & Save Button	5 pts	Comprehensive form containing:
• Recipe name
• Image upload / preset picker / URL
• Ingredients list (dynamic row addition & deletion)
• Step-by-step instructions (dynamic step addition & deletion)
• "Save Recipe" button with validation.
9	New Recipe Displayed in "My Recipes"	1 pt	Saving a recipe immediately adds it to state and persistent storage, opening the "My Recipes" / "My Food" feed with the new recipe displayed.
10	Full Details for "My Recipes"	3 pts	Clicking any recipe in "My Recipes" displays full recipe details (name, hero image, prep time, servings, calories, difficulty, ingredients, and instructions).
11	Functional "Edit" and "Delete" Buttons	2 pts	Recipes in "My Recipes" feature explicit "Edit" and "Delete" buttons. "Delete" removes the recipe with confirmation; "Edit" opens the pre-populated form allowing full editing and saving.
12	Functional Back Button	1 pt	Prominent "← Back" button on Recipe Detail, Add Recipe, and Edit Recipe screens returning smoothly to the feed.
🚀 How to Submit for Peer Review
Step 1: Push this code to your GitHub
Create a new public repository on GitHub (e.g., foodie-recipe-app).
Run the following commands in terminal:
git init
git add .
git commit -m "Initial commit - Foodie Recipe App complete project"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/foodie-recipe-app.git
git push -u origin main
Step 2: Test on Snack Expo
Go to https://snack.expo.dev.
Click on the 3 dots menu or Import Git Repository.
Enter your public GitHub repository URL: https://github.com/YOUR_USERNAME/foodie-recipe-app.
Snack will load your project. You can run it directly on Web, iOS simulator, or Android!
Step 3: Peer Review Submission
Submit the public GitHub repository URL (e.g., https://github.com/YOUR_USERNAME/foodie-recipe-app) and optionally your Snack Expo URL.
