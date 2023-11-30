const express = require('express');
const router = express.Router();
const { getRecipes } = require('../utils/tastyApi');

// GET route to retrieve recipes
router.get('/api/recipes', async (req, res) => {
  try {
    const query = req.query.q || 'pasta'; // Default to 'pasta' if no query is provided
    const recipes = await getRecipes(query);
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST route to add a new recipe
router.post('/api/recipes', (req, res) => {
  // Implement code to add a new recipe to the database
});

module.exports = router;