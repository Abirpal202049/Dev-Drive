const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env
const User = require('../models/user')

// This Middleware sees weather a token is present or not and as per that give decision to render which navbar on the top of the page weather it's 1 OR 2

const isTokenPresent = async (req, res, next) => {
    try {
        let flag;
        let userProfile = "";
        console.log(req.cookies.Token);
        if(!(req.cookies.Token)){
            // If no token Render navbar 1
            flag = "One"
            
        }else{
            // If Token is present render navbar 2-(Profile type)
            flag = "Two"
            const decode = jwt.verify(req.cookies.Token, SECRET_KEY);
            console.log(decode.email);
            userProfile = await User.findOne({email : decode.email})
            userProfile =userProfile.username
        }
        const valuePassOn = {
            flag : flag,
            userProfile : userProfile
        }
        req.decision = valuePassOn;

    } catch (error) {
        return res.status(400).json({
            error : error.message
        })
    }
    next();
}


module.exports = isTokenPresent;