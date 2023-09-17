const { fetchGroupsCodes } = require("../Controllers.js/income-group-controller");

const router = require("express").Router();

router.get('/income-group-codes',fetchGroupsCodes);

module.exports=router