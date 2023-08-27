const express=require('express');
const router=express.Router();

const auth=require("../config/auth");
const {signUp,signUpRender,logIn,logInRender,Logout}=require('../controllers/user_controller');
const { profile }=require('../controllers/home_controller');

router.get('/sign_up',signUpRender); //renders the sign up page
router.post('/sign_up',signUp);
router.get('/log_in',logInRender); //render the log in page
router.post('/log_in',logIn);
router.get('/profile',auth,profile); // profile
router.get('/log_out',Logout);

module.exports = router;