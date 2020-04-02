const express = require('express');
const router = express.Router();
const User = require('../controllers/User');
const withAuth = require ('../middleware');

/* Public Routes */
router.post('/login', User.login);
router.post('/register', User.register);

/* Private Routes */
router.get('/checkToken', withAuth, User.checkToken);
router.post('/edit',withAuth, User.edit);
router.get('/',withAuth, User.findOne);

module.exports = router;