const { json } = require('express');
const express = require('express');
const router = express.Router();
const Hotel = require('../models/hotel');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

//insert paxi ko :,auth.verifyUser,auth.verifyAdmin
router.post('/add/hotel', upload.array('image', 3), function (req, res) {
    // if (req.file == undefined) {
    //     return res.status(400).json({
    //         message: "Only jpg,jpeg,png,gif files are allowed"
    //     })
    // }
    const name = req.body.name
    const description = req.body.description
    const price = req.body.price
    const location = req.body.location
    const rooms = req.body.rooms

    const reqFiles = [];
    for (var i = 0; i < req.files.length; i++) {
        reqFiles.push(req.files[i].filename)
    }
    // const image = req.files[];
   
    const hotelData = new Hotel({
        name: name,
        description:description,
        price: price,
        location: location,
        rooms: rooms,
        image: reqFiles

    });
    hotelData.save()
        .then(function (result) {
            res.status(201).json({ message: "Hotel added!!", data:result })
        })
        .catch(function (e) {
            res.status(500), json({ Error: e })
        })

})

// router.put("/update/item", function (req, res) {
//     const itemName = req.body.itemName;
//     const itemType = req.body.itemType;
//     const itemPrice = req.body.itemPrice;
//     const id = req.body.Id;
// console.log(req.body)

//     Item.updateOne({ _id: id }, { itemName: itemName, itemType: itemType, itemPrice: itemPrice })
//         .then(function (result) {
//             res.status(200).json({ message: "Updated" })
//         })
//         .catch(function (e) {
//             res.status(500).json({ error: e })
//         })

// })

//for delete
router.delete('/delete/hotel/:id', function (req, res) {
    const id = req.params.id
    Hotel.deleteOne({ _id: id })
        .then(function (result) {
            res.status(200).json({ status: success })
        })
        .catch(function (e) {
            res.status(200).json({ error: e })
        })
})

router.get("/hotel/all", function (req, res) {
    Hotel.find()
        .then(function (data) {
            console.log(data)
            res.status(200).json(data)
        })
        .catch(function (er) {
            res.status(500).json({ error: e })
        })
})

router.get("/hotel/:id", function (req, res) {
    const id = req.params.id;
    Hotel.findById({ _id: id })
        .then(function (data) {
            res.status(200).json(data);
        })
        .catch(function (er) {
            res.status(500).json({ error: er })
        })
})

module.exports = router;