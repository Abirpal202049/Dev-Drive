const User = require('../models/user')


exports.dashboard = async (req, res) => {
    // console.log(req.forwaddingDataFromMiddlewareToRoutes)
    const userId = req.forwaddingDataFromMiddlewareToRoutes.email
    console.log(userId);
    const loggeduser = await User.findOne({email :userId})

    // console.log(loggeduser);
    res.render('Secure-authProfile', {user : loggeduser.username})
}


exports.profile = (req, res) => {
    res.send("This is profile Page")
}
