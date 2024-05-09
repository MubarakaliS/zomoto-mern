const menuitems = require("../Modal/MenuItems");

exports.getAllmenuItem = async (req, res) => {
  try {
    const result = await menuitems.find();
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
  }
};

exports.getAddItems = async(req,res) =>{
  try {
      const name=req.params.name
      let result = await menuitems.find({name:name})
      res.status(200).send(result)
  } catch (error) {
      console.log(error);

  }
}


