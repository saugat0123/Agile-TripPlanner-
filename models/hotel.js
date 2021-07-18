const mongoose = require('mongoose');

const Hotel = mongoose.model("Hotel", {
    name: {
        type: String,
        required: [true, 'Enter hotel name']
    },

    price: {
        type: Number,
        required: [true, 'Enter room price']
    },
    location: {
        type: String,
        required: [true, 'Enter hotel location']
    },
    rooms: {
        type: Number,
        required: [true, 'Enter number of rooms']
    },
    image: {
        type: Array
    }
})

module.exports = Hotel