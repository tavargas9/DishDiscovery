const axios = require('axios');

//Add the Tasty API key to your .env file under TASTY_API_KEY
//Example: TASTY_API_KEY='ExampleAPIKey123'
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