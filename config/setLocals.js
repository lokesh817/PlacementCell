function setLocals(req,res,next){
    if(req.user && req.isAuthenticated){
        res.locals.user=req.user;
        res.locals.isAuthenticated=true;
    }else{
        res.locals.user=undefined;
        res.locals.isAuthenticated=false;        
    }
    next();
}
module.exports=setLocals;