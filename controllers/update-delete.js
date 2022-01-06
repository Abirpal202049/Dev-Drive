const User = require('../models/user')
const Article = require('../models/artical')



exports.deleteArticles = async (req, res) => {
    try {
        const delArticle = await Article.deleteOne({_id : req.params.id})
        console.log(delArticle);
        res.redirect('/loginuser')
    } catch (error) {
        return res.status(400).json({error})
    }
    
}

exports.updateArticle = async (req, res) => {
    try {
        const user = req.username.username
        const article = await Article.findOne({_id : req.params.id})
        const finalRoute = "edit/"+req.params.id;
        console.log(finalRoute);

        
        return res.render('Secure-articles', {
            user : user, 
            userId : req.username.userId,
            articleData : article, 
            RouteLocation : finalRoute,
            work : "Update"
        })
        
    } catch (error) {
        return res.status(400).json({error})
    }
}


exports.updateArticlePost = async (req, res) => {
    try {
        const {title, description} = req.body

        const article = await Article.updateOne({_id : req.params.id}, {$set : {title : title , description : description}})
        console.log(article);


        res.redirect('/loginuser')
    } catch (error) {
        return res.status(400).json({error})
    }
}