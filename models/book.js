const mongoose = require('mongoose');
const Item=require('./item');
const date = new Date().toLocaleDateString("en-US").split("/").toString()
const RowOfBooking=new mongoose.Schema({
  hId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Product'
},  
  hName:{
    type:String,
      required:true
  },
  hPrice:{
    type:String,
    required:true
  },
  hLocation:{
    type:String,
    required:true
  },
  hImage:{
  type:String,
  default:'no-img.jpg'
  
  },
  numAdult:{
    type:Number,
    required:true,
    default:1
  },
  numChild:{
    type:Number,
  },
  checkin:{
    type:Date
  },
  checkout:{
    type:Date
  },
  total:{
    type:String,
    required:true
  }
  })
  
  const bookSchema= new mongoose.Schema
  ({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    
    booking:[RowOfBooking]
  },
  { timestamps: true });
  
  module.exports = mongoose.model('Book',bookSchema)