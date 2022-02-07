const express = require('express')
const app = express()
require('dotenv').config()

const apiRooter = require("./routers/api")
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(express.json());
app.use('/api',apiRooter)

app.listen(3000,(req, res)=>{
    console.log("Starting is server");
})