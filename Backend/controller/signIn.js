const signUp =require("../Modal/signup")

exports.getSignIn =async(req,res)=> {
    try{
        const {emailId} = req.body;
        const result = await signUp.findOne({emailId:emailId})
        if(result){
            res.status(200).send("Login successfully")
        }
        else{
            res.send("User not exist")
        }
    }
    catch(err){
        console.error(err)
    }
}