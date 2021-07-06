const mongoose=require('mongoose');
const User=mongoose.model('User',{
    firstName : {
        type : String,
        // required : [true,'Enter first name']
    },
    lastName : {
        type : String,
        // required : [true,'Enter last name']
    },
    
    password: {
        type: String,
        // required: [true, "Please add a password"],
        // minlength: 6,
        select: false, // it will not return the password when quering
      },

    address: {
      type: String
      },
  
    phone: {
        type: String,
        // required : [true,'Enter phone number']
        },

    email: {
            type: String,
            // required : true,
            unique : true
            },
    
    photo: {
      type: String,
      default: "no-photo.jpg",
    },
    balance:{
      type: Number,
      default: 10000
    },

    userType: {
      type: String,
      // required : true,
      enum:['Admin','Customer'],
      default:'Customer'
      }
})
module.exports=User;