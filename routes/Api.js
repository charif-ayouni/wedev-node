const express = require('express');
const router = express.Router();
const Api = require('../controllers/Api');

/* Public Routes */
router.get('/all', Api.finAll);

module.exports = router;
