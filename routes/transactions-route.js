const { getRCTNumber, getTransactions, createTransaction, updateTransaction } = require('../Controllers.js/transactions-controller');

const router = require('express').Router();

router.get('/receipt-number',getRCTNumber);
router.get('/transactions',getTransactions);
router.post('/transactions',createTransaction);
router.put('/transactions/:id',updateTransaction);

module.exports=router