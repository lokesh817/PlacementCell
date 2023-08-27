const employeeModel = require("../models/Employee");
const studentModel = require("../models/Student");
const interviewModel = require("../models/Interview");
const { render } = require("ejs");
const axios = require('axios');

module.exports.profile=async function(req,res){
    const id=req.userId;
    try{
        const user = await employeeModel.findOne({ _id:id });
        if (user) {
            res.render('profile',{
                title:"profile",
                user:user,
                isAuthenticated:true
            })
        } else {
            res.status(401).json({ message:'User not found' });
        }
    }catch(error){
        res.status(500).json({ error: error.message || 'An error occurred' });
    }
    
}
module.exports.jobs=async function(req,res){
    try {
        const response = await axios.get(process.env.ADDJUNA_URL);
        const data=response.data;
        res.render('Jobs',{
            title:'Jobs',
            data:data,
        })
    } catch (error) {
        console.error('Error fetching data from API:', error);
    }  
}
module.exports.home=async function(req,res){
    if(req.isAuthenticated){
        try{
            const students= await studentModel.find({});
            const interviews=await interviewModel.find({});
            res.render("home",{
                title:'Placement | home',
                Students:students,
                Interviews:interviews
            })
        }catch(error){
            res.render('error',{
                title:"error",
                message:"nothing found",
            })
        }    
    }else{
        res.render('home',{
            title:"home",
            message:"login first"
        })
    }
}