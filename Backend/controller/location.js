
const location = require("../Modal/location")

exports.getAllLoc =async(req,res)=>{
    try{
        const result = await location.find()
        res.status(200).send(result)
    }catch(err){
        console.log(err)
    }
}
exports.getAllLocById = async (req, res) => {
    const location_id = req.params.location_id;
    try {
        const cityRes = await location.find({ location_id: location_id });
        res.status(200).send(cityRes);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};




