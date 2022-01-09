const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema

const articalSchema = new mongoose.Schema({
    user : {
        type : ObjectId,
        ref : "User"
    },
    title : {
        type : String,
        default : null
    },
    description : {
        type : String,
    },
    like : {
        type : Array,
        default : []
    },
    likecount : {
        type :  Number,
        default : 0
    }
},{timestamps : true,})

module.exports = mongoose.model("Articles", articalSchema);