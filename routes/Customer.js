const express = require('express');
const router = express.Router();
const Customer = require('../controllers/Customer')


router.get('/customers',Customer.getCustomers);
router.get('/customers/:id_customer',Customer.getCustomer);

router.post('/customers',Customer.addCustomer);
router.put('/customers/:id_customer',Customer.updateCustomer);
router.delete('/customers/:id_customer',Customer.deleteCustomer);



module.exports = router;