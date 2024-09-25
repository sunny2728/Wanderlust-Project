
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment:string,
    rating:{
        max:1,
        mim:5,
    },

    createdAt:{
        type:Date,
        default:Date.now(),
    },

})

module.exports = mongoose.model("Review",reviewSchema)