const mongoose = require('mongoose')
const date = new Date()


const conBook = mongoose.Schema({
    UserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
    ,

    ProductId:[
        {
        item:{
          type:mongoose.Schema.Types.ObjectId,
        ref:'Room'
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
const ConfirmBook = mongoose.model('ConfirmBook',conBook)
module.exports =ConfirmBook
