const User = require('./User');
const Dish = require('./Dish');
const Recipe = require('./Recipe');
const Comment = require('./Comment');
const Favorite = require('./Favorite');


User.hasMany(Dish, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Dish.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

Comment.belongsTo(Dish, {
  
})

Dish.belongsTo(User, {
  foreignKey: 'user_id'
});

Recipe.belongsTo(Dish, {
  foreignKey: 'user_id'
});

User.hasMany(Favorite, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})



module.exports = { User, Dish, Recipe, Comment };