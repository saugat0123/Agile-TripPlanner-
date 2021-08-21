const express = require('express')
const {verifyAdmin, verifyEmployee, verifyUser} = require('../middleware/auth')
const router = express.Router()
const booking = require('../modules/Booking')
const Order = require('../modules/order')
const order = require('../modules/order')


//proceeding towards final ordering
router.post('/order', verifyUser, function (req, res) {

    let total = 0
    const user = req.user
    booking.findOne({UserId: user._id}).populate('UserId').populate({path: 'ProductId.item'}).then(function (result) {
        let items = []
        result.ProductId.map((item) => {

            let qty = item.qty
            let price = item.item.Price;
            total += price * qty

            items = result.ProductId


        })

        console.log(req.body.lat)

        const od = new order({
            UserId: req.user._id,
            ProductId: items,
            totalAmount: total,
            lat: req.body.lat,
            lng: req.body.lng,
            address: req.body.address

        })

        od.save().then(result =>{
            order
                .populate(od, { path: "UserId" })
                .then(ord => {

                    res.json({
                        message: "Order Placed",
                        ord
                    });

                })
        })
        booking.deleteOne({UserId: req.user._id})
        res.status(200).json({
            success: true, data: od
        })
    })
})


//all order for specific person
router.get('/allOrder', verifyUser, function (req, res) {

    let totals = 0
    const user = req.user
    order.find({UserId: user._id}).populate('ProductId.item').populate('UserId').then(function (data) {
        console.log(data)

        res.status(200).json({success: true, data: data, total: data.totalAmount})
    })
})


//for total sales on particular day
router.get('/allOrders', verifyUser, verifyAdmin, function (req, res) {
    let totals = 0
    order.find().populate('ProductId.item').populate('UserId').then(function (data) {

        for (let d in data) {
            totals += data[d].totalAmount
            console.log(data[d])

        }
        console.log(totals)
        res.status(200).json({success: true, data: data, total: totals})

    })

})


router.get('/emp', verifyUser, verifyEmployee, function (req, res) {


    Order.find({EmployeeId: req.user._id}).populate('ProductId.item').populate('UserId').then((data) => {

        res.status(200).json({data: data})
    })
})


// for approving orders

router.put('/approve/:oid', verifyUser, verifyAdmin, function (req, res) {
    const uid = req.params.oid

    Order.findOneAndUpdate({_id: uid}, {
        orderStatus: true
    }).then(function (result) {

        res.status(200).json({status: true})
    })
})


//un Approved order by admin


router.delete('/cancelOrder/:uid', verifyUser, function (req, res) {


    Order.findOneAndDelete({_id: req.params.uid}).then(function (data) {

        res.status(200).json({message: "Order Deleted"})
    })

})

router.get('/unApproved', verifyUser, function (req, res) {
    console.log("Kina Ayena")
    order.find({orderStatus: false}).populate('ProductId.item').populate('UserId').then(function (data) {
        console.log(data)
        res.status(200).json({success: true, data: data, total: data.totalAmount})
    })

})

//unDelivered for employees
router.get('/unDelivered', verifyUser, verifyEmployee, function (req, res) {
    Order.find({
        DeliveredStatus: false,
        orderStatus: true
    }).populate('ProductId.item').populate('UserId').then(function (data) {
        return res.status(200).json({success: true, data: data, message: "UnDelivered Products"})
    })

})

//for employees to accept the deliveries
router.put('/Acceptdelivery/:orderid', verifyUser, verifyEmployee, function (req, res) {

    Order.findOneAndUpdate({_id: req.params.orderid}, {
        DeliveredStatus: true,
        EmployeeId: req.user._id
    }).then(function (done) {
        res.status(200).json({success: true, message: "Delivered Accepted"})
    })


})


module.exports = router
