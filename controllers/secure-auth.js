const User = require('../models/user')
const Article = require('../models/artical')
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env


exports.dashboard = async (req, res) => {
    // console.log(req.forwaddingDataFromMiddlewareToRoutes)
    const userEmail = req.forwaddingDataFromMiddlewareToRoutes.email
    console.log(userEmail);
    const user = await User.findOne({email : userEmail})
    const userId = user._id;
    const articles = await Article.find({user : userId})
    console.log(articles);
    res.render('Secure-authProfile', {user : user.username, article : articles})
}


exports.article = async (req, res) => {
    const userEmail = req.forwaddingDataFromMiddlewareToRoutes.email
    const loggeduser = await User.findOne({email :userEmail})
    res.render('Secure-articles', {user : loggeduser.username})
}


// ! POST
exports.createArticles = async (req, res) => {
    try {
        const {title, description} = req.body
        if(!(title || description)){
            return res.status(400).json({
                message : "Field Missing"
            })
        }
        const userEmail = req.forwaddingDataFromMiddlewareToRoutes.email
        const user = await User.findOne({email : userEmail})
        const userId = user._id;
        const article = await Article.create({
            user : userId,
            title,
            description
        })

        console.log(article);
        res.redirect("/loginuser")
    } catch (error) {
        res.status(400).json({
            message : 'A error has occered'
        })
    }
    
}


exports.allArticle = async (req, res) => {
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
        console.log(flag);

        const articles = await Article.find({})
        const users = await User.find({})
        res.render('Secure-allArticle', {articles : articles, users : users, flag : flag, user : userProfile})
    } catch (error) {
        return res.status(400).json({error : error.message});
    }
    
}