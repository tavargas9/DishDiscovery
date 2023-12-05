////NEED TO FILL OUT - MARK?????
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Recipe extends Model {}


Recipe.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          prep_time: {
            type: DataTypes.STRING,
            allowNull: false
          },
          servings: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          ingredients: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          directions: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        },
        {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'recipe',
    }
);

module.exports = Recipe;



