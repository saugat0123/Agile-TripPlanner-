const mongoose=require('mongoose');

const Item=mongoose.model("Item",{
        itemName : {
            type : String,
            required : [true,'Enter item name']
        },
        itemType : {
            type : String,
            required : [true,'Enter type type']
        },
    
        itemPrice: {
            type: String,
            required : [true,'Enter item price']
            },
        
        itemRating: {
            type: String
        },
        itemImage: {
            type: String,
            default: "no-photo.jpg",
          }
         
})

module.exports=Item;