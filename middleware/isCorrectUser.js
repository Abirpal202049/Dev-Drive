const User = require('../models/user')
const Article = require('../models/artical')

const isCorrectUser = async (req, res, next) => {
    try {
        const userEmail = req.forwaddingDataFromMiddlewareToRoutes.email
        const user = await User.findOne({email : userEmail})
        const userId1 = user._id;

        console.log(req.params.id);

        const checkArticle = await Article.findOne({_id : req.params.id})
        const userId2 = checkArticle.user;


        if (!(String(userId1) === String(userId2))) {
            return res.status(400).json({
                message : "Access Denied"
            })
        }
        
    } catch (error) {
        return res.status(400).json({
            error : error.message
        })
    }
    next();
}

module.exports = isCorrectUser