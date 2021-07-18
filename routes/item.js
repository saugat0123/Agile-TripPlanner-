const { json } = require('express');
const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

//insert paxi ko :,auth.verifyUser,auth.verifyAdmin
router.post('/add/item',upload.single('image'),auth.verifyUser , function (req, res) {
    if (req.file == undefined) {
        return res.status(400).json({
            message: "Only jpg,jpeg,png,gif files are allowed"
        })
    }
    
        const itemName = req.body.itemName
        const itemType = req.body.itemType
        const itemPrice = req.body.itemPrice
        const itemRating = req.body.itemRating
        const image = req.file.filename;
        const itemData = new Item({
            itemName: itemName,
            itemType: itemType,
            itemPrice: itemPrice,
            itemRating: itemRating,
            itemImage: image
        });
        itemData.save()
            .then(function (result) {
                res.status(201).json({ message: "Item added!!" })
            })
            .catch(function (e) {
                res.status(500). json({ error: e })
            })
        
})

router.put("/update/item", function (req, res) {
    const itemName = req.body.itemName;
    const itemType = req.body.itemType;
    const itemPrice = req.body.itemPrice;
    const id = req.body.Id;
console.log(req.body)

    Item.updateOne({ _id: id }, { itemName: itemName, itemType: itemType, itemPrice: itemPrice })
        .then(function (result) {
            res.status(200).json({ message: "Updated" })
        })
        .catch(function (e) {
            res.status(500).json({ error: e })
        })

})

//for delete
router.delete('/delete/item/:id', function (req, res) {
    const id = req.params.id
    Item.deleteOne({ _id: id })
        .then(function (result) {
            res.status(200).json({ status: success })
        })
        .catch(function (e) {
            res.status(200).json({ error: e })
        })
})

router.get("/item/all", function (req, res) {
    Item.find()
        .then(function (data) {
            res.status(200).json(data)
        })
        .catch(function (er) {
            res.status(500).json({ error: e })
        })
})

router.get("/item/:id", function (req, res) {
    const id = req.params.id;
    Item.findById({ _id: id })
        .then(function (data) {
            res.status(200).json(data);
        })
        .catch(function (er) {
            res.status(500).json({ error: er })
        })
})

module.exports = router;