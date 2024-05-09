
const signUp = require("../Modal/signup")

exports.getAllSignUp = async(req,res) =>{
    try{
        
        const {name, emailId, password} = req.body;
        const result = await signUp.findOne({emailId:emailId})
        if(result){
            return res.send("already Exist")
        }
        var data=await signUp.create({name:name, emailId:emailId,password:password})
        res.status(200).send(data)
    }
    catch(err) { console.error(err)}
}
