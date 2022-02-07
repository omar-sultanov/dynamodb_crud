const express = require("express");
const router = express.Router();
const productEndPoint = require("../routers/product/product")
router.use('/product', productEndPoint)

module.exports=router;