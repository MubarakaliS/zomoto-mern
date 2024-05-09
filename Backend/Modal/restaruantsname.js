const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    id:{
        type:String
    },
    name:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    location_id:{
        type:Number,
        required:true
    },
    city_id:{
        type:Number,
        required:true
    },
    thumb:[
        {
            type:String,
            required:true
        },
        {
            type:String,
            required:true
        },
        {
            type:String,
            required:true
        },
        {
            type:String,
            required:true
        }
    ],
    aggrefate_rating:{
        type:Number,
    },
    rating_text:{
        type:String,
    },
    min_price:{
        type:Number,
    },
    contact_number:{
        type:Number,
    },
    cuisine:[{
        
        id:{type:Number,required:true},
        name:{type:String,required:true}
    },{
        
        id:{type:Number,required:true},
        name:{type:String,required:true}
    }
    ],
    image:{
        type:String,required:true
    },
    mealtype_id:{
        type:Number,
        required:true
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User
