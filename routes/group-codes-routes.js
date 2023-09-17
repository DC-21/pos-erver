const { fetchGroupsCodes, postIncomeGroupCodes } = require("../Controllers.js/income-group-controller");

const router = require("express").Router();

router.get('/income-group-codes',fetchGroupsCodes);
router.post('/income-group-codes',postIncomeGroupCodes);

module.exports=router