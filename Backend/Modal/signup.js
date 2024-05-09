const mongoose = require("mongoose")

const signup = new mongoose.Schema({
    name:{type:String,required:true},
    emailId:{type:String, required:true},
    password:{type:String,required:true}
})

const signup_db = mongoose.model('signup',signup)

module.exports =signup_db