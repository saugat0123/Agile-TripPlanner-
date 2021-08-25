const express = require('express');
const {verifyUser, verifyAdmin} = require('../middleware/auth');
const router = express.Router()
const upload = require('../middleware/upload')
const Hotel = require('../modules/Hotel')
router.post('/addHotel', verifyUser, verifyAdmin, upload.single('images'), (req, res) => {
    const file = req.file
    const name = req.body.name;
    const address = req.body.address;
    const phone = req.body.phone;

    const hotel = new Hotel({
        name: name,
        address: address,
        phone: phone,
        images: file.filename,
        roomPrice: req.body.roomPrice
    });
    console.log(req.file)

    hotel
        .save()
        .then((data) => {
            return res.json({success: true});

        })
        .catch((err) => {
            return AppError.onError(res, "Hotel add error" + err);
        });
    console.log(hotel)
});
router.put('/upHotel/:id', verifyUser, verifyAdmin, upload.single('images'), (req, res) => {
    const name = req.body.name;
    const address = req.body.address;
    const phone = req.body.phone;
    if (req.file) {
        const file = req.file


        Hotel.findByIdAndUpdate({_id: req.params.id}, {
            name: name,
            address: address,
            phone: phone,
            roomPrice: req.body.roomPrice,
            images: file.filename
        })

            .then((updata) => {
                return res.json({success: true, data: updata});

            })
            .catch((err) => {
                return AppError.onError(res, "Hotel update error" + err);
            });


    } else {

        Hotel.findByIdAndUpdate({_id: req.params.id}, {
            name: name,
            address: address,
            phone: phone,
            roomPrice: req.body.roomPrice,

        })
            .then((updata) => {
                return res.json({success: true, data: updata});

            })
            .catch((err) => {
                return AppError.onError(res, "Hotel update error" + err);
            });

    }

});

router.get('/getHotel/:id', function (req, res) {

    Hotel.findOne({_id: req.params.id}).populate('items').then((data) => {
        console.log("data::::::", data)
        res.status(200).json({success: true, data: data})

    })


})


router.get('/getHotel', (req, res, next) => {

    Hotel.find()
        .then((items) => {
            console.log("items:::::::::", items)
            res.status(200).json({success: true, data: items});
        })
        .catch((err) => {
            return AppError.onError(res, "Hotel get error" + err);
        });
});


router.delete('/delHotel/:id', function (req, res) {

    Hotel.deleteOne({_id: req.params.id}).then(function (result) {

        res.status(200).json({success: true, message: "Hotel Deleted"})
    })
})


module.exports = router
