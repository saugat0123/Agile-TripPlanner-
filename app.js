const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const db=require('./database/db');
const app=express();

app.use(cors());
app.use(express.static(__dirname+'/images'))
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));

app.listen(3001)
