const { getCompany, createCompany, deleteCompany } = require('../Controllers.js/company-controllers');

const router = require('express').Router();

router.get('/company-data',getCompany);
router.post('/company-data',createCompany);
router.delete('/company-data/:id',deleteCompany);

module.exports = router;