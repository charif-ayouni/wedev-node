const express = require('express');
const router = express.Router();
const Customer = require('../controllers/Customer');

router.post('/add/',Customer.add);
router.put('/edit/:id',Customer.edit);
router.delete('/remove/:id',Customer.remove);
router.get('/list/',Customer.list);
router.get('/:id',Customer.findOne);

module.exports = router;