const router = require('express').Router();
const { Op } = require('sequelize');
const { Dish, User, Recipe, Favorite } = require('../models');
const withAuth = require('../utils/auth');
const { getRecipes, getMoreInfo } = require('./api/tastyApi')

router.get('/', async (req, res) => {
  try {
    // Get all dishes and JOIN with user data
    const dishData = await Dish.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const apiData = await getRecipes('pasta');
    const recipes = apiData.results;
    // Serialize data so the template can read it
    const dishes = dishData.map((dish) => dish.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      dishes,
      recipes, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/search/:query', async (req, res) => {
  try {
   // Get all dishes and JOIN with user data
    const dishData = await Dish.findAll({
      where: {
        dish_title: {
          [Op.like]: `%${req.params.query}%`, // Case-insensitive search
        },
      },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const apiData = await getRecipes(req.params.query);
    const recipes = apiData.results;
    // Serialize data so the template can read it
    const dishes = dishData.map((dish) => dish.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      dishes,
      recipes, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dish/:id', async (req, res) => {
  try {
    const dishData = await Dish.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Recipe,
          attributes: [
            'prep_time',
            'servings', 
            'ingredients',
            'directions'
          ],
        },
      ],
    });

    const dish = dishData.get({ plain: true });

    res.render('dish', {
      ...dish,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dish/tasty/:id', async (req, res) => {
  try {
    const dishData = await getMoreInfo(req.params.id);

    const dish = {
      name: dishData.name,
      description: dishData.description,
      thumbnail_url: dishData.thumbnail_url,
      num_servings: dishData.num_servings,
      ingredients: dishData.sections[0].components,
      instructions: dishData.instructions
    };
    
    res.render('dishTasty', {
      ...dish,
      logged_in: req.session.logged_in
    })
  } catch (err) {
    res.status(500).json(err);
  }
})

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      //
      //Take a look and see if this is important to have
      //include: [{ model: Dish }],
      //
      //
    });
    
    const favoritesData = await Favorite.findAll(
      {where: {
        user_id: req.session.user_id,
      },
    })

    const user = userData.get({ plain: true });


    console.log(favoritesData);

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
