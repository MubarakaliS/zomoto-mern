const mongoose = require("mongoose");

const MenuItems = new mongoose.Schema({
  id: { type: String },
  userId: { type: Number },
  name: { type: String },
  items: [
    {
      name: { type: String },
      price: { type: Number },
      desc: { type: String },
      qty: { type: Number },
    },
  ],
  amount: { type: Number },
});

const menuitems = mongoose.model("menuitems", MenuItems);

module.exports = menuitems;
