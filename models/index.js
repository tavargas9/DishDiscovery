const User = require('./User');
const Dish = require('./Dish');
const Recipe = require('./Recipe');
const Comment = require('./Comment');
const Favorite = require('./Favorite');

Dish.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Dish, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});
/////////////
/////Comment may possible belong to many, Dish and User, will look into that more.
Comment.belongsTo(Dish, {
  foreignKey: 'dish_id',
});

Dish.hasMany(Comment, {
  foreignKey: 'dish_id',
  onDelete: 'CASCADE'
});

//////////////

Recipe.belongsTo(Dish, {
  foreignKey: 'recipe_id'
});

Dish.hasOne(Recipe, {
  foreignKey: 'recipe_id',
  onDelete: 'CASCADE'
});

//////////////
Favorite.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Favorite, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})





module.exports = { User, Dish, Recipe, Comment, Favorite };