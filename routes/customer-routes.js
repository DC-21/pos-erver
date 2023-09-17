const { fetchCustomers, saveCustomers, updateCustomers, getCustomers, updateCustomer } = require('../Controllers.js/customer-controller');

const router = require('express').Router();

router.get('/customer-data',fetchCustomers);
router.post('/customer-data',saveCustomers);
router.put('/customer-data',updateCustomers);
router.get('/customers',getCustomers);
router.put('/customers/:customerNo',updateCustomer);

module.exports = router;