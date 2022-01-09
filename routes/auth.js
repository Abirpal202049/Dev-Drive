const express = require('express');
const router = express.Router(); 
const auth = require('../middleware/auth')
const isUser = require('../middleware/isCorrectUser')
const isTokenPresent = require('../middleware/isTokenPresent')

const User = require('../models/user')
const Articles = require('../models/artical')

const {homePage, getRegister, postRegister, getLogin, postLogin, signOut} = require('../controllers/auth')
const {dashboard, article, createArticles, allArticle, profile} = require('../controllers/secure-auth')
const {deleteArticles, updateArticle, updateArticlePost} = require('../controllers/update-delete')


// ! General Routes
router.get('/', isTokenPresent, homePage)
router.get('/allarticles', isTokenPresent, allArticle)
router.get('/aboutus', isTokenPresent, allArticle)
router.get('/contactus', isTokenPresent, allArticle)
router.get('/register', getRegister)
router.post('/register', postRegister)
router.get('/login', getLogin)
router.post('/login', postLogin)
router.get("/signout", signOut)


// ! Secure Routes
router.get("/loginuser", auth, dashboard)
router.get('/articles', auth, article)
router.get('/profile/:id', auth, profile)
router.post('/createArticle', auth , createArticles)
router.get("/like/:articalId/:userId", auth, async (req, res)=>{
    console.log(req.params.articalId);
    console.log(req.params.userId);

    const article = await Articles.findOne({_id : req.params.articalId})
    const articalLike = article.like;
    console.log(articalLike);

    // Search weather the userId is already present in the like array or not
    let arrayIndex = articalLike.findIndex((ele) => { 
        if ( ele === req.params.userId) { 
            return ele
        }
    })

    console.log(arrayIndex);
    if(arrayIndex == -1){
        const updateLike = await Articles.updateOne({_id : req.params.articalId}, {$push : {like : req.params.userId}})
        console.log(updateLike);
    }else{
        articalLike.splice(arrayIndex, 1)
        const updateLike = await Articles.updateOne({_id : req.params.articalId}, {$set : {like : articalLike}})
    }

    res.redirect('/allarticles')
})

//! Delete Article
router.get('/delete/:id',auth, isUser, deleteArticles)
router.get('/edit/:id',auth, isUser, updateArticle)
router.post('/edit/:id',auth, isUser, updateArticlePost)



module.exports = router