const mongoose = require('mongoose')
const Facility = mongoose.model('Facility',{


Name:{
    type:String,
    require:true
},
Description:{
    type:String
},

Room:{
    type:Number,
    default:1
},
Price:{
    type:Number,
    require:true
},
Image:{
    type:String,
    default:"no-image.jpg"
},
hotel:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Hotel'
}
,category:{
    type:String,
    enum:["Sunglass","TrekkingSticks","Bagpack","Wears"]
}


})

module.exports = Facility
