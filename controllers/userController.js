
const userModel = require('../models/userModel');
const urlModel = require('../models/urlModel');
const shortid = require('shortid');

module.exports.Profile = async (req,res)=>{
    try{
        let user = await userModel.findById({_id : req.id});
        if(!user){
            return res.redirect('/back');
        }

        const all_url = await urlModel.find({user : user._id});
        return res.render('profile',{
            user : user,
            all_url
        });
    }catch(err){
        console.log(err)
        return res.status(502).send({
            message : "Server down"
        })
    }
}



module.exports.create_short_url = async(req,res)=>{
    try{
        const {original_url} = req.body;
        let user = await userModel.findById({_id : req.id});
        if(!user){
            return res.redirect('/back');
        }

        // create short url
        const short_url = shortid();

        // store url
        const url = new urlModel({
            originalUrl : original_url,
            user : user._id,
            shortUrl : short_url
        });
        await url.save();
        return res.redirect('/');
    }catch(err){
        console.log(err);
        return res.status(404).send({
            message : "data not found"
        })
    }
}



module.exports.show_short_url = async(req,res)=>{
    try{
        let short_url = await urlModel.findOne({shortUrl : req.params.url});
        if(!short_url)return res.status(404).send({
            message : "Invalid Link"
        });
        return res.redirect(short_url.originalUrl);
    }catch(err){
        return res.status(404).send({
            message : "Error !!!! Page Not Found"
        })
    }
}