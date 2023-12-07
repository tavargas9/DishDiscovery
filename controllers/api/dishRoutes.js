const router = require('express').Router()
const { getRecipes, getMoreInfo } = require('./tastyApi');
const { Dish } = require('../../models');
const { Favorite } = require('../../models');

// GET route to retrieve recipes
router.get('/', async (req, res) => {
  try {
    const query = req.body.q || 'pasta'; // Default to 'pasta' if no query is provided
    const recipes = await getRecipes(query);
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  try{
    const id = req.params.id;
    const recipes = await getMoreInfo(id);
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
})
// POST route to add a new recipe
router.post('/', (req, res) => {
  // Implement code to add a new recipe to the database
});

router.post('/favorite', async (req, res) => {
  // return res.json("hello")
  console.log("-------------")
  console.log(req.body)
  console.log("-------------")
  console.log("-------------")
  console.log(req.body.recipe_id)
  console.log("-------------")
  try {
    const newFavorite = await Favorite.create({
      recipe_id: req.body.recipe_id,
      user_id: req.session.user_id,
    });
console.log(newFavorite)
    res.status(200).json(newFavorite);
  } catch (err) {
    res.status(400).json(err);
  }
});
module.exports = router;
