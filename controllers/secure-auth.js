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
    const articles = await Article.find({user : userId}).sort({updatedAt : 1})
    console.log(articles);
    res.render('Secure-authProfile', {user : user.username, article : articles, userId : userId})
}


exports.article = async (req, res) => {
    const userEmail = req.forwaddingDataFromMiddlewareToRoutes.email
    const loggeduser = await User.findOne({email :userEmail})
    const article = {
        title : null,
        description : null
    }
    res.render('Secure-articles', {
        user : loggeduser.username,
        userId :  loggeduser._id,
        RouteLocation : "createArticle", 
        articleData : article,
        work : "Save"
    })
}


// ! POST
exports.createArticles = async (req, res) => {
    try {
        const {title, description} = req.body
        if((title == null || description == null)){
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
        const articles = await Article.find({}).sort({createdAt : 1})
        const users = await User.find({})

        res.render('Secure-allArticle', {articles : articles, users : users, flag : req.decision.flag, user : req.decision.userProfile, userId : req.decision.userId})
    } catch (error) {
        return res.status(400).json({error : error.message});
    }
    
}


exports.profile = async (req, res) => {
    try {
        const userEmail = req.forwaddingDataFromMiddlewareToRoutes.email
        const user = await User.findOne({email : userEmail})
        const selecteduser = await User.findOne({_id : req.params.id})
        console.log(selecteduser);
        const articles = await Article.find({user : selecteduser._id}).sort({updatedAt : 1})
        res.render('Profile', { user : user.username, SelectedUser : selecteduser, userId : user._id, article : articles})
    } catch (error) {
        return res.status(400).json({error : error.message});
    }
}