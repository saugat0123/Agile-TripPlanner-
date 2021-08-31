const mongoose = require('mongoose');

const date = new Date()
const month = date.getMonth()
const year = date.getFullYear()
const day = date.getDate()

const bookschema = new mongoose.Schema({

    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },

    ProductId: [
        {
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Room'
            },
            qty: {
                type: Number,
                default: 1
            }

        }]
    ,
    Date: {
        type: String,
        default: `${year}/${month}/${day}`
    }

})


bookschema.methods.editCart = function (proItem, newQty) {
    const itemIndex = this.ProductId.findIndex((cf) => {
        return cf.item._id.toString() === proItem._id.toString();
    });

    if (newQty < 1) {
        this.ProductId = this.ProductId.filter((cf) => {
            return cf.item._id.toString() !== this.ProductId.filter((cf) => {
                return cf.item._id.toString() !== proItem._id.toString();
            })._id.toString();
        });
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

const Book = mongoose.model('Book', bookschema);

module.exports = Book
