const express = require('express');
const router = express.Router();
const Customer = require('../controllers/Customer')


router.post('/customer',Customer.addCustomer);
router.delete('/customer/:id_customer',Customer.deleteCustomer);



module.exports = router;