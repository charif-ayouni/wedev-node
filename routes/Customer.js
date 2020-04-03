const express = require('express');
const router = express.Router();
const Customer = require('../controllers/Customer');
const withAuth = require ('../middleware');

router.post('/add/', withAuth, Customer.add);
router.put('/edit/:id', withAuth, Customer.edit);
router.delete('/remove/:id', withAuth, Customer.remove);
router.get('/list/', withAuth, Customer.list);
router.get('/:id', withAuth, Customer.findOne);

module.exports = router;