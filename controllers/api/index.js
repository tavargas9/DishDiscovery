const router = require('express').Router();
const userRoutes = require('./userRoutes');
const dishRoutes = require('./dishRoutes');

router.use('/users', userRoutes);
router.use('/dishes', dishRoutes);

module.exports = router;
