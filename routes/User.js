const express = require('express');
const router = express.Router();
const User = require('../controllers/User');
const withAuth = require ('../middleware');

/* Public Routes */
router.post('/login', User.login);
router.post('/register', User.register);

/* Private Routes */
router.get('/checkToken', withAuth, User.checkToken);
router.get('/list',withAuth, User.getUsers);
router.get('/:id',withAuth, User.getUser);

module.exports = router;