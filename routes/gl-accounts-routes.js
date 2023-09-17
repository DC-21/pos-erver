const { fetchGlAccounts, postGlAccounts, updateGlAccounts, getGlAccounts } = require('../Controllers.js/gl-accounts-controller');

const router = require('express').Router();

router.get('/gl-accounts',fetchGlAccounts);
router.post('/gl-accounts',postGlAccounts);
router.put('/gl-accounts',updateGlAccounts);
router.get('/glaccounts',getGlAccounts);

module.exports = router;