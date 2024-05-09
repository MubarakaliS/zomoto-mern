
const mealType = require("../Modal/mealtype")

exports.getAllMealtype =async(req,res)=>{
    try{
        const result = await  mealType.find()
        res.status(200).send(result)
    }catch(err){
        console.log(err)
    }
}