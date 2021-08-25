const express = require('express')
const bodyparser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
const route = require('./routes/routes')
const oroute = require('./routes/orderRoutes')
const oute = require('./routes/Store_Routes')
const iroute = require('./routes/Item_Routes')
const db = require('./database/db')
const broute = require('./routes/cartRoutes')
const hroute = require('./routes/Hotel_Routes')

const cors = require('cors');

const app = express()
app.use(bodyparser.urlencoded({extended:false}))
app.use(express.json())
app.use('/images', express.static(__dirname + '/images'));

// app.use(fileupload())
app.use(cors())


app.use(route)

app.use(broute);
app.use(iroute);
app.use(oroute);
app.use(oute);
app.use(hroute);


app.listen(3000)
