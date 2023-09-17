const { getRCTNumber, getTransactions, createTransaction, updateTransaction } = require('../Controllers.js/transactions-controller');

const router = require('express').Router();

router.get('/receipt-number',getRCTNumber);
router.get('/transaction',getTransactions);
router.post('/transaction',createTransaction);
router.put('/transaction',updateTransaction);

module.exports=router