const express = require('express');
const router = express.Router();
const User = require('../controllers/User')

router.get('/users', User.getUsers);
router.get('/users/:id_user', User.getUser);

router.post('/register', User.register);
router.post('/login', User.login);


module.exports = router;