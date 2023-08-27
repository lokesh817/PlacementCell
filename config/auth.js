const jwt=require('jsonwebtoken');
const secretKey="placementApp";
const employeeSchema=require("../models/Employee");

function auth(req,res,next){
    try{
        const token=req.cookies.jwt;
        if(token){
            let user= jwt.verify(token,secretKey);
            const verifyUser=async(employeeSchema)=>{
                let ifUser=await employeeSchema.findById(user.id);
                if(ifUser){
                    return true;
                }else{
                    return false;
                }
            }
            req.isAuthenticated=verifyUser(employeeSchema);
            req.user=user.email; 
        }
        next();
    }
    catch(error){
        console.log(error);
    }
}
module.exports=auth;