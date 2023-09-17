const { fetchGroupsCodes, postIncomeGroupCodes, updateIncomeGroupCodes, getCodes } = require("../Controllers.js/income-group-controller");

const router = require("express").Router();

router.get('/income-group-codes',fetchGroupsCodes);
router.post('/income-group-codes',postIncomeGroupCodes);
router.put('/income-group-codes',updateIncomeGroupCodes);
router.get('/income-groups',getCodes);

module.exports=router