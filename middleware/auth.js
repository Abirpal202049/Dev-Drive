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
        return res.status(400).json({error})
    }
    next();
}


module.exports = auth;