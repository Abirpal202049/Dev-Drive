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