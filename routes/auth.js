const express = require('express');
const router = express.Router(); 
const auth = require('../middleware/auth')
const isUser = require('../middleware/isCorrectUser')

const {homePage, getRegister, postRegister, getLogin, postLogin, signOut} = require('../controllers/auth')
const {dashboard, article, createArticles, allArticle} = require('../controllers/secure-auth')
const {deleteArticles} = require('../controllers/update-delete')


// ! General Routes
router.get('/', homePage)
router.get('/register', getRegister)
router.post('/register', postRegister)
router.get('/login', getLogin)
router.post('/login', postLogin)
router.get("/signout", signOut)
router.get('/allarticles', allArticle)


// ! Secure Routes
router.get("/loginuser", auth, dashboard)
router.get('/articles', auth, article)
router.post('/createArticle', auth , createArticles)

//! Delete Article
router.get('/delete/:id',auth, isUser, deleteArticles)



module.exports = router