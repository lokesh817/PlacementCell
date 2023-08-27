const express=require('express');
const router=express.Router();

//requiring used routr file
router.use('/user',require('./UserRouter'));
router.use('/student',require('./StudentRoute'));
router.use('/interview',require('./interviewRoute'));
router.use('/home',require('./homeRoute'));
module.exports=router;