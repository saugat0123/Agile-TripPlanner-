const mongoose = require('mongoose')
const Room = mongoose.model('Room', {


    Name: {
        type: String,
        require: true
    },
    Description: {
        type: String
    },

    Rating: {
        type: Number,
        default: 3
    },
    Price: {
        type: Number,
        require: true
    },
    Image: {
        type: String,
        default: "no-image.jpg"
    },
    hotel: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel'
    }
    , category: {
        type: String,
        enum: ["SingleBed", "DoubleBed", "TripleBed"]
    }


})

module.exports = Room
