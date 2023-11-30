const sequelize = require('../config/connection');
const { User, Dish } = require('../models');

const userData = require('./userData.json');
const dishData = require('./dishData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const dish of dishData) {
    await Dish.create({
      ...dish,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
