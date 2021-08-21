const mongoose = require('mongoose')
const date = new Date()


const oschema = mongoose.Schema({
    UserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
    ,

    ProductId:[
        {
        item:{
          type:mongoose.Schema.Types.ObjectId,
        ref:'Item'
        },
        qty:Number
        }],
      totalAmount: {
        type: Number,
        required: true,
      },
      orderDate: {
        type: String,
        default:`${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`
      },
      paidThrough: {
        type: String,
        enum:["Cash","Card"],
        default:"Cash"
      },
      paymentResponse: {
        type: String,
        default:"Not-Paid"
      },
      orderStatus: {// delivered // cancelled // failed
        type: Boolean,
        default:false
      },
      DeliveredStatus:{
        type:Boolean,
        default:false
      },
      lat:{
        type:String,
        default:""
      },
      lng:{
        type:String,
        default:""
      },
      address:{
        type:String,
        default:""
      }

})
const Order = mongoose.model('Order',oschema)
module.exports =Order
