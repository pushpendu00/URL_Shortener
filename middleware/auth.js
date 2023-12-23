
const {verify_jwt_token} = require('../utils/jwt');
const userModel = require('../models/userModel');

const auth = async (req,res,next)=>{
    try{
        const token = req.cookies.jwt;
        if(!token){
            return res.redirect('/login');
        }
        let user = await verify_jwt_token(token);
        let authUser = await userModel.findById({_id : user.userId});
        if(!authUser){
            return res.redirect('/register');
        }
        req.id = authUser._id;
        next();
    }catch(err){
        // console.log(err);
        return res.send({
            message : "Authentication Error"
        })
    }
}
module.exports = auth;