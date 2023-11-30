const sequelize = require('../config/connection');
const { User, Dish, Recipe } = require('../models');

const userData = require('./userData.json');
const dishData = require('./dishData.json');
const recipeData = require('./recipeData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const recipes = await Recipe.bulkCreate(recipeData, {
    returning: true,
  });

  for (const dish of dishData) {
    // Find the corresponding recipe based on dish.recipe_id
    const correspondingRecipe = recipes.find((recipe) => recipe.id === dish.recipe_id);

    // If the corresponding recipe is found, create the Dish
    if (correspondingRecipe) {
    await Dish.create({
      ...dish,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      recipe_id: correspondingRecipe.id,
    });
    } else {
      console.error(`Recipe with id ${dish.recipe_id} not found for dish with id ${dish.id}`);
    }
  }

  process.exit(0);
};

seedDatabase();
