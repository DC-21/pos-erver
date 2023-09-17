const { fetchCustomers, saveCustomers, updateCustomers } = require('../Controllers.js/customer-controller');

const router = require('express').Router();

router.get('/customer-data',fetchCustomers);
router.post('/customer-data',saveCustomers);
router.put('/customer-data',updateCustomers);

module.exports = router;