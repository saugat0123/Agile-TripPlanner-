const Product = require('../modules/Booking');
const mongoose = require('mongoose');
// use the new name of the database
const url = 'mongodb://localhost:27017/FoodApplication';
beforeAll(async () => {
 await mongoose.connect(url, {
 useNewUrlParser: true,
 useCreateIndex: true
 });
});
afterAll(async () => {
 await mongoose.connection.close();
});


describe('Product Schema test anything', () => {
// the code below is for insert testing
 it('Add product testing anything', () => {
 const product = {
 'UserId': '605c047381a2d61fe44a19a2',
 'ProductId': [],

 "Date":"5"
 };
 
 return Product.create(product)
 .then((pro_ret) => {
    
 expect(pro_ret.Date).toEqual('5');
 });
 });

 it('to test the delete product is working or not', async () => {
 const status = await Product.findByIdAndDelete({_id:"607dc027dd0d590f400abf5a"});
 console.log(status)
 expect(status.Date).toEqual("5");
 })


    
   })