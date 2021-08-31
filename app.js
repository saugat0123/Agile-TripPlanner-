const express = require('express')
const bodyparser = require('body-parser')
const route = require('./routes/routes')
const orderRoute = require('./routes/orderRoutes')
const storeRoute = require('./routes/Store_Routes')
const itemRoute = require('./routes/Item_Routes')
const db = require('./database/db')
const cartRoute = require('./routes/cartRoutes')
const hotelRoute = require('./routes/Hotel_Routes')
const roomRoute = require('./routes/Room_Routes')
const bookRoute = require('./routes/bookRoutes')
const confirmRoute = require('./routes/confirmBookRoute')

const cors = require('cors');

const app = express()
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.json())
app.use('/images', express.static(__dirname + '/images'));

app.use(cors())


app.use(route)

app.use(cartRoute);
app.use(itemRoute);
app.use(orderRoute);
app.use(storeRoute);
app.use(hotelRoute);
app.use(roomRoute);
app.use(bookRoute);
app.use(confirmRoute);


app.listen(3000)
