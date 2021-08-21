const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const contact = mongoose.scheme({

UserId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
},
Comment:{
    type:String
}

})

const contacts = mongoose.model("Contact",contact)
module.exports = contacts



