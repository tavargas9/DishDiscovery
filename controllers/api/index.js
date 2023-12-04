const router = require('express').Router();
const userRoutes = require('./userRoutes');
// Had to comment out below because dishRoutes is not working due to API
const dishRoutes = require('./dishRoutes');

router.use('/users', userRoutes);
router.use('/dishes', dishRoutes);

module.exports = router;
