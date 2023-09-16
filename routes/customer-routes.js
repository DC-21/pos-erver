const { fetchCustomers, saveCustomers } = require('../Controllers.js/customer-controller');

const router = require('express').Router();

router.get('/customer-data',fetchCustomers);
router.post('/customer-data',saveCustomers);

module.exports = router;