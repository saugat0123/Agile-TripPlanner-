const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const hotel = new Schema({
  name: {
    type: String,
    required: true,
  },

  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  roomPrice: {
    type: Number,
  },
  images: {
    type: String,
  }
});
const hotell =mongoose.model("Hotel", hotel);

module.exports = hotell
