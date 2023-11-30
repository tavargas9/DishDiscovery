const User = require('./User');
const Dish = require('./Dish');
const Recipe = require('./Recipe');

User.hasMany(Dish, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Dish.belongsTo(User, {
  foreignKey: 'user_id'
});

Recipe.belongsTo(Dish, {
  foreignKey: 'user_id'
})

Dish.belongsTo(Recipe, {
  foreignKey: 'recipe_id',
  onDelete: 'CASCADE', 
});


module.exports = { User, Dish, Recipe };