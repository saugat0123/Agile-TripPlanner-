const mongoose = require('mongoose')
const Item = mongoose.model('Item',{


Name:{
    type:String,
    require:true
},
Description:{
    type:String
},

Rating:{
    type:Number,
    default:3
},
Price:{
    type:Number,
    require:true
},
Image:{
    type:String,
    default:"no-image.jpg"
},
store:{

    type:mongoose.Schema.Types.ObjectId,
    ref:'Store'
}
,category:{
    type:String,
    enum:["Sunglass","TrekkingSticks","Bagpack","Wears"]
}


})

module.exports = Item
