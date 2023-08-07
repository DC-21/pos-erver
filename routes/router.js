const router = require("express").Router();
const {signup,login,signUp, deleteUser, updatePassword, forgotPassword, resetPassword}=require('../Controllers.js/Cont')

router.post('/signup',signup);
router.post('/login',login);
router.get('/signUp',signUp);
router.delete('/delete',deleteUser);
router.put('/update-password',updatePassword);
router.post('/forgot-password',forgotPassword);
router.post('/reset-password',resetPassword);

module.exports= router;