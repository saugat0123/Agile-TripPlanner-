const mongoose = require('mongoose');

const date = new Date()

const bschema = new mongoose.Schema({

    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },

    ProductId: [
        {
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Item'
            },
            qty: {
                type: Number,
                default: 1
            }

        }]
    ,
    Date: {
        type: String,
        default: `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`
    }

})


bschema.methods.editCart = function (proItem, newQty) {
    const itemIndex = this.ProductId.findIndex((cf) => {
        return cf.item._id.toString() === proItem._id.toString();
    });

    if (newQty < 1) {
        const updatedItems = this.ProductId.filter((cf) => {
            return cf.item._id.toString() !== proItem._id.toString();
        });
        this.ProductId = updatedItems;
        return this.save();
    } else {
        if (itemIndex >= 0) {
            let updatedItems = [...this.ProductId];
            updatedItems[itemIndex].qty = newQty;

            this.ProductId = updatedItems;
            return this.save();
        } else {
            return new Promise.reject();
        }
    }
};

const Booking = mongoose.model('Booking', bschema);

module.exports = Booking
