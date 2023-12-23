
const userModel = require('../models/userModel');
const urlModel = require('../models/urlModel');
const {create_jwt_token} = require('../utils/jwt');
const {create_hash_password, verify_hash_password} = require('../utils/hash');

// Register functionality
module.exports.register_page = (req,res)=>{
    try{
        if(req.cookies.jwt){
            return res.redirect('/');
        }
        return res.render('register');
    }catch(err){
        return res.status(502).send({
            message : "Register Page not found"
        })
    }
}


// Login functionality
module.exports.login_page = (req,res)=>{
    try{
        if(req.cookies.jwt){
            return res.redirect('/');
        }
    return res.render('login');
    }catch(err){
        return res.status(502).send({
            message : "Login Page not found"
        })
    }
}






/******************************/
/*       POST Auth               */
/******************************/

// Register functionality
module.exports.register = async (req,res)=>{
    try{
        const {name, userName, password} = req.body;
        let user = await userModel.findOne({userName : userName});
        // If user is present so register not possible
        if(user){
            return res.redirect('/login');
        }

        // If user not present so register is possible
        let hash_password = await create_hash_password(password);
        const new_user = new userModel({
            name, userName, password : hash_password
        });
        user = await new_user.save();
        
        // create jwt
        const token = await create_jwt_token(user);
        // store jwt token in cookie
        res.cookie('jwt',token,{
            expires : new Date(Date.now()+2592000000),
            httpOnly : true
        });

        return res.redirect('/');
    }catch(err){
        // console.log(err);
        return res.status(502).send({
            message : "Register Error"
        })
    }
}


// Login functionality
module.exports.login = async (req,res)=>{
    try{
        const {userName, password} = req.body;
        let user = await userModel.findOne({userName : userName});
        // If user is present so register not possible
        // console.log(user);
        if(!user){
            return res.redirect('/register');
        }

        let isverify = await verify_hash_password(password, user.password);
        if(!isverify){
            return res.redirect('back');
        }
        // create jwt
        const token = await create_jwt_token(user);
        // store jwt token in cookie
        res.cookie('jwt',token,{
            expires : new Date(Date.now()+2592000000),
            httpOnly : true
        });

    return res.redirect('/');
    }catch(err){
        // console.log(err);
        return res.status(502).send({
            message : "Login Error"
        })
    }
}

// Log Out functionality
module.exports.logOut = (req,res)=>{
    try{
        res.clearCookie('jwt');
        return res.redirect('/');
    }catch(err){
        return res.send({
            message : "Log Out Error"
        })
    }
}
