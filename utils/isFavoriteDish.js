const { Favorite } = require('../models');

const isFavoriteDish = async (userId, recipeId) => {
    try {
      // Check if there is a favorite record for the user and dish
      const favorite = await Favorite.findOne({
        where: {
          user_id: userId,
          recipe_id: recipeId,
        },
      });
  
      // Return true if a favorite record exists, otherwise false
      return !!favorite;
    } catch (error) {
      console.error('Error checking favorite status:', error);
      throw error;
    }
};
  

module.exports = isFavoriteDish;