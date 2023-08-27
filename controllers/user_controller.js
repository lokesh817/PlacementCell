const employeeModel = require("../models/Employee");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = process.env.secretKey;
const tokenExpiration = "30m";

module.exports.signUpRender=function(req,res){
    return res.render('sign_up',{
        title:"Sign | Up"
    });
}
module.exports.signUp= async function(req,res){
    const {name,email,password,empID,password2}=req.body;
    if(password!==password2){
        return res.render('error',{
            title:"Error",
            message:"Bad request password does not match"} 
        )
    }
    try{
        const existingUser= await employeeModel.findOne({email});
        if(existingUser){
            return res.render('error',{
                title:"Error",
                message:"User Already Exists"} 
            )
        }
        const hashedPassword= await bcrypt.hash(password,10);
        const result= await employeeModel.create({
            empName:name,
            empEmail:email,
            empId:empID,
            empPassword: hashedPassword
        })
        const token=jwt.sign({
            email:result.empEmail,
            id:result._id
        },secretKey,{ expiresIn: tokenExpiration });
        res.redirect('/home')
    }catch(error){
        return res.render('error',{
            title:"Error",
            message:"Employee not created"} 
        )
    }  
}
module.exports.logInRender=function(req,res){
    return res.render('log_in',{
        title: 'Placement | Log in '
    });
}
module.exports.logIn= async function(req,res){
    //find user exsits or not
    //password and EmployeeId
    //verify generate token 
    const {email,empID,password}=req.body;
    try{
        const existingUser= await employeeModel.findOne({empEmail:email});
        if(!existingUser){
            return res.render('error',{
                title:"Error",
                message:"User not exists"} 
            )
        }
        const matchedPassword= await bcrypt.compare(password,existingUser.empPassword);
        if(!matchedPassword){
            return res.render('error',{
                title:"Error",
                message:"Wrong Password"} 
            )
        }
        if(empID!==existingUser.empID){
            return res.render('error',{
                title:"Error",
                message:"Invalid employee ID"} 
            )
        }
        const token=jwt.sign(
            {
                email:existingUser.empEmail,
                id:existingUser._id
            },
        secretKey,
        { expiresIn: tokenExpiration });
        res.cookie('jwt',token);
        res.redirect('/home')
    }
    catch(error){
        return res.render('error',{
            title:"Error",
            message:"Unknow error at login time"} 
        )
    }
}
module.exports.Logout=async(req,res)=>{
    res.clearCookie('jwt');
    res.redirect('/home');
}
