const User = require('../models/user')
const Article = require('../models/artical')


exports.dashboard = async (req, res) => {
    // console.log(req.forwaddingDataFromMiddlewareToRoutes)
    const userEmail = req.forwaddingDataFromMiddlewareToRoutes.email
    console.log(userEmail);
    const user = await User.findOne({email : userEmail})
    const userId = user._id;
    const articles = await Article.find({user : userId})
    console.log(articles);
    // console.log(loggeduser);
    res.render('Secure-authProfile', {user : user.username, article : articles})
}


exports.article = async (req, res) => {
    const userId = req.forwaddingDataFromMiddlewareToRoutes.email
    const loggeduser = await User.findOne({email :userId})
    res.render('Secure-articles', {user : loggeduser.username})
}

// ! POST
exports.createArticles = async (req, res) => {
    try {
        const {title, description} = req.body
        // console.log(req.body);
        const userEmail = req.forwaddingDataFromMiddlewareToRoutes.email
        // console.log(userEmail);
        const user = await User.findOne({email : userEmail})
        // console.log(user);
        const userId = user._id;
        // console.log(userId);
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
