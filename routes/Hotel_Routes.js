
const express = require('express');
const { verifyUser, verifyAdmin } = require('../middleware/auth');
const router = express.Router()
const upload = require('../middleware/upload')
const Store = require('../modules/Hotel')
router.post( '/addHotel',verifyUser,verifyAdmin,upload.single('images'),(req, res) => {
  const file = req.file
    const name = req.body.name;
    const foodType = req.body.foodType;
    const pincode = req.body.pincode;
    const address = req.body.address;
    const phone = req.body.phone;

    const store = new Store({
      name: name,
      foodType: foodType,
      pincode: pincode,
      address: address,
      phone: phone,
      images:file.filename,
      rating:req.body.rating,
    });
    console.log(req.file)

    store
      .save()
      .then((data) => {
        return res.json({success:true});

      })
      .catch((err) => {
        return AppError.onError(res, "Hotel add error" + err);
      });
      console.log(store)
  });
  router.put( '/upStore/:id',verifyUser,verifyAdmin,upload.single('images'),(req, res) => {
    const name = req.body.name;
    const foodType = req.body.foodType;
    const address = req.body.address;
    const phone = req.body.phone;
  if(req.file){
    const file = req.file


    Store.findByIdAndUpdate({_id:req.params.id},{
      name: name,
      foodType: foodType,
      address: address,
      phone: phone,
      rating:req.body.rating,
      images:file.filename
    })

      .then((updata) => {
        return res.json({success:true, data:updata});

      })
      .catch((err) => {
        return AppError.onError(res, "Hotel update error" + err);
      });


  }
   else{

    Store.findByIdAndUpdate({_id:req.params.id},{
      name: name,
      foodType: foodType,
      address: address,
      phone: phone,
      rating:req.body.rating,

    })
      .then((updata) => {
        return res.json({success:true, data:updata});

      })
      .catch((err) => {
        return AppError.onError(res, "Hotel update error" + err);
      });

   }

    });





  router.get('/getHotel/:id',function(req,res){

    Store.findOne({_id:req.params.id}).populate('items').then((data)=>{
console.log("data::::::",data)
res.status(200).json({success:true,data:data})

    })

  })

router.get('/getHotel',(req, res, next) => {

    Store.find().populate('items')
      .then((items) => {
        // console.log("items:::::::::",items)
        res.status(200).json({success:true,data:items});
      })
      .catch((err) => {
        return AppError.onError(res, "Hotel get error" + err);
      });
  });


router.delete('/delHotel/:id',function(req,res){

  Store.deleteOne({_id:req.params.id}).then(function(result){

    res.status(200).json({success:true,message:"Hotel Deleted"})
  })
})


module.exports =router
