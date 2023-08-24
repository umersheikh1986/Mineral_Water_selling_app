const express = require('express');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors');
const dotanv = require('dotenv')
const colors = require('colors')
require('colors');
const connectDB = require("./config/config");

dotanv.config()
//rest object
connectDB();
const app = express();

// middle ware 
 app.use(cors())
 app.use(express.json())
 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({extended:false}))
 app.use(morgan("dev"))

 // routes

app.use('/api/items',require('./routes/itemRoutes'))
app.use('/api/users',require('./routes/userRoutes'))
app.use('/api/bills',require('./routes/billsRoutes'))

// port

const PORT = process.env.PORT || 8080


 app.listen(PORT,()=>{

    console.log(`SERVER RUNNING ON ${PORT}`)
 });