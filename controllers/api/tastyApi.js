// utils/tastyApi.js
const axios = require('axios');

const TASTY_API_KEY = process.env.TASTY_API_KEY;
const TASTY_API_BASE_URL = 'https://tasty.p.rapidapi.com';

const getRecipes = async (query) => {
  try {
    const response = await axios.get(`${TASTY_API_BASE_URL}/recipes/list`, {
      params: { q: query },
      headers: {
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
        'X-RapidAPI-Key': TASTY_API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching recipes from Tasty API:', error.response ? error.response.data : error.message);
    throw error;
  }
};

module.exports = { getRecipes };