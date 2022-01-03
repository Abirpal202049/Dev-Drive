const express = require('express');
const router = express.Router(); 
const auth = require('../middleware/auth')

const {homePage, getRegister, postRegister, getLogin, postLogin, signOut} = require('../controllers/auth')
const {dashboard, profile} = require('../controllers/secure-auth')


// ! General Routes
router.get('/', homePage)
router.get('/register', getRegister)
router.post('/register', postRegister)
router.get('/login', getLogin)
router.post('/login', postLogin)
router.get("/signout", signOut)


// ! Secure Routes
router.get("/loginuser", auth, dashboard)
router.get('/profile', auth, profile)



module.exports = router