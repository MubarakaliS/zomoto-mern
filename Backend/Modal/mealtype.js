const mongoose = require("mongoose")

const mealTypeSchma = new mongoose.Schema({
    name:{type:String},
    content:{type:String},
    image:{type:String},
    meal_type:{type:Number}

})
const mealtype = mongoose.model('mealtype',mealTypeSchma)

module.exports =  mealtype