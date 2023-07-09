const router = require('express').Router();

const userRoutes = require('./users');
const cardRoutes = require('./cards');
const logout = require('./logout');

router.use('/logout', logout);
router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

module.exports = router;
