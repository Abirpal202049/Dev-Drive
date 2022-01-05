const bcrypt = require('bcryptjs');
const User = require('../models/user')
const Articles = require('../models/artical')
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env

exports.homePage = async (req, res) => {
    try {
        console.log(req.decision);
        const articles = await Articles.find({}).sort({updatedAt : 1})
        const users = await User.find({})

        res.render('index', {articles : articles, users : users, flag : req.decision.flag, user : req.decision.userProfile})

    } catch (error) {
        return res.status(400).clearCookie("Token").json({error})
    }
    
}


exports.getRegister = (req, res) => {
    res.render('register')
}


exports.postRegister = async (req, res) => {
    try {
        const {username, password, email, confirmPassword} = req.body

        if(!(username && password && email && confirmPassword)){
            console.log("All fields are required");

            return res.status(404).json({
                message : "All fields are required"
            })
        }


        const singaluser = await User.findOne({email})
        if(singaluser){
            return res.status(404).json({
                message : "A user with this email is already present in the database"
            })
        }


        //* If password and confirmpassword are not same then rerender the '/register' page with the details
        if(password != confirmPassword) {
            console.log("Both the password are not same");
            /* 
            return res.status(404).json({
                message : "Both the password are not same"
            }) 
            */
            return res.render('register', {username : username, email : email, password : password})
        }


        const securePassword = await bcrypt.hash(password , 10) // Hashing the password
        const user = await User.create({
            username,
            email,
            password : securePassword
        })

        const token = jwt.sign(
            { id : user._id, email},
            SECRET_KEY,
            { 
                expiresIn : "2h"
            }
        )
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };


        console.log(user);
        user.password = undefined;
        return res.status(200).cookie("Token", token, options).redirect("/loginuser")
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({error})
    }
}


exports.getLogin = (req, res) => {
    res.render('login')
}


exports.postLogin = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!(email && password)) {
            return res.status(400).json({
                message: "All filds are mandetory"
            })
        }
        const specificUser = await User.findOne({email})
        //! If user is there and password also matches
        if(specificUser && (await bcrypt.compare(password, specificUser.password))){

            // ? JWT token creation
            const token = jwt.sign(
                { id : specificUser._id, email},
                SECRET_KEY,
                { 
                    expiresIn : "2h"
                }
            )
            

            //? Putting the token into the cookies
            const cookieOption = {
                TOKEN : token,
                Username : specificUser.username
            } 

            //? Giving the time and he details that when the cookie need to be expires 
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };

            specificUser.password = undefined;
            // Todo : Here we are putting the token into th Headers BUT How to put the token into Headers like <Authorization Bearer [Token]>
            return res.status(200).cookie("Token", token, options).redirect("/loginuser")

            /*
            return res.status(200).cookie("Token", cookieOption, options).json({
                success: true,
                token,
                specificUser,
            })
            */
        }

        return res.status(400).clearCookie("Token").send("Email or Password is incorrect")

    } catch (error) {
        return res.status(400).json({error})
    }
}


exports.signOut = (req, res) => {
    res.clearCookie("Token")
    res.redirect('/')
}