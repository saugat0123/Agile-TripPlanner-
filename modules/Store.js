const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const store = new Schema({
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
    rating: {
        rate: Number,
    },
    images: {
        type: String,
    },
    items: [
        {
            type: Schema.Types.ObjectId,
            ref: "Item"
        }

    ],
});
const stor = mongoose.model("Store", store);

module.exports = stor
