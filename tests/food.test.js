const Product = require('../modules/Item');
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
 'Name': 'Burg',
 'Price': '21',
 'Description':'asdasdasd',
 "Rating":"5"
 };

 return Product.create(product)
 .then((pro_ret) => {
 expect(pro_ret.Name).toEqual('Burg');
 });
 });

//  it('to test the delete product is working or not', async () => {
//  const status = await Product.findByIdAndDelete({_id:"607dbcdd1ae5e520309baadc"});
//  console.log(status)
//  expect(status.Name).toEqual("Burg");
//  })


it('to test the update', async () => {
    return Product.findOneAndUpdate({_id :Object('607dbbf451c8214be8343951')},
   {$set : {Name:'hari'}})
    .then((pp)=>{
    console.log(pp)
    expect(pp.Name).toEqual('hari')
    })

   });

   })
