const mongoose = require('mongoose');
const { MONGODB_URL } = process.env

exports.connect = () => {
    mongoose
        .connect(MONGODB_URL)
        .then(console.log("Connected to Database"))
        .catch((err)=>{
            console.log("Error : ", err);
        })
}
