const restaruant = require("../Modal/restaruantsname");

exports.getAllrestaruant = async (req, res) => {
  try {
    const result = await restaruant.find();
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
  }
};
exports.getAllrestLocById = async (req, res) => {
  const location_id = req.params.location_id;
  try {
    const cityRes = await restaruant.find({ location_id: location_id });
    res.status(200).send(cityRes);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
exports.getrestid = async (req, res) => {
  const id = req.params.id; 
  try {
    const restaurant = await restaruant.findById(id); 
    if (!restaurant) {
      return res.status(404).send("Restaurant not found");
    }
    res.status(200).send(restaurant);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

exports.getCity = async (req, res) => {
  try {
    const city = req.params.city;
    const requestCity = await restaruant.find({ city: city }); 
    res.status(200).send(requestCity);
  } catch (err) {
    console.log(err);
  }
};
exports.getQuery = async (req, res) => {
  try {
    const { mealtype_id, city, cuisine, lowCost, highCost, sort, page } =
      req.query;

    const query = {};

    if (mealtype_id) query.mealtype_id = mealtype_id;
    if (city) query.city = city;
    if (cuisine) {
      query["cuisine.name"] = String(cuisine);
    }
    if (lowCost && highCost)
      query.min_price = { $gte: lowCost, $lte: highCost };

    const sortOptions = {};
    if (sort) sortOptions[sort] = 1;

    const limit = 10;
    const skip = (page - 1) * limit;

    const restaurants = await restaruant
      .find(query)
      .sort(sortOptions)
      .limit(limit)
      .skip(skip);

    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.filter = async (req, res) => {
  let { mealtype_id, location_id, cuisine_id, hcost, lcost } = req.body;
  let sort = req.body.sort ? req.body.sort : 1;
  let page = req.body.page ? req.body.page : 1;

  let itemPerPage = 2;
  let startIndex = page * itemPerPage - itemPerPage;
  let endIndex = page * itemPerPage;

  console.log("cuiseneid", cuisine_id);

  let payload = {};

  if (mealtype_id) {
    payload = { mealtype_id: mealtype_id };
  }
  if (mealtype_id && location_id) {
    payload = {
      mealtype_id: mealtype_id,
      location_id: location_id,
    };
  }
  if (mealtype_id && cuisine_id) {
    payload = {
      mealtype_id: mealtype_id,
      "cuisine.id": { $in: cuisine_id },
    };
  }
  if (mealtype_id && hcost && lcost) {
    payload = {
      mealtype_id: mealtype_id,
      min_price: { $lte: hcost, $gte: lcost }
    };
  }
  if (mealtype_id && cuisine_id && hcost && lcost) {
    payload = {
      mealtype_id: mealtype_id,
      min_price: { $lte: hcost, $gte: lcost },
      "cuisine.id": { $in: cuisine_id },
    };
  }
  if (mealtype_id && location_id && cuisine_id) {
    payload = {
      mealtype_id: mealtype_id,
      location_id: location_id,
      "cuisine.id": { $in: cuisine_id },
    };
  }
  if (mealtype_id && location_id && hcost && lcost) {
    payload = {
      mealtype_id: mealtype_id,
      location_id: location_id,
      min_price: { $lte: hcost, $gte: lcost },
    };
  }
  if (mealtype_id && location_id && cuisine_id && hcost && lcost) {
    payload = {
      mealtype_id: mealtype_id,
      location_id: location_id,
      min_price: { $lte: hcost, $gte: lcost },
      "cuisine.id": { $in: cuisine_id },
    };
  }
  console.log(payload);
  let list = await restaruant.find(payload).sort({ min_price: sort });
  let arr = [];
  for (let i = 1; i <= Math.ceil(res.length / itemPerPage); i++) {
    arr.push(i);
  }
  try {
    res.status(200).json(list);
  } catch (err) {
    res.status(500).send(err);
  }
};
