const User = require('./User');
const Dish = require('./Dish');
const Recipe = require('./Recipe');
const Comment = require('./Comment');


User.hasMany(Dish, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Dish.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

Dish.belongsTo(User, {
  foreignKey: 'user_id'
});

Recipe.belongsTo(Dish, {
  foreignKey: 'user_id'
});


module.exports = { User, Dish, Recipe, Comment };