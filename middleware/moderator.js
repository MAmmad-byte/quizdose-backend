module.exports =  async(req,res,next)=>{
    if(req.user.role.isModerator ||  req.user.role.isAdmin){
        return next();
    }else{
        return res.status(401).send("Access denied! Un-Authorized User.")
    }    
}