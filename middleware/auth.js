const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env

const auth = (req, res, next) => {
    try {
        console.log(req.cookies);
        const token = req.cookies.Token;

        if(!token){
            return res.status(403).json({
                message : "No Token is Present"
            })
        }

        const decode = jwt.verify(token, SECRET_KEY);
        //? console.log("Decode",decode);
        req.forwaddingDataFromMiddlewareToRoutes = decode;

    } catch (error) {
        console.log(error.message);
        res.clearCookie("Token")
        return res.redirect('/')
    }
    next();
}


module.exports = auth;