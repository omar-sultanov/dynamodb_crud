const AWS = require('aws-sdk');
const productServices = require("../services/product")
require('dotenv').config()
AWS.config.update({
    region: "us-east-1",
    accessKeyId:process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

const docClient = new AWS.DynamoDB.DocumentClient();
const table = "Product";

//function addData for create data in database
exports.addData= async (req,res)=>{
    const response = await productServices.addProduct(req.params);
    res.send(response)
 }

//readData function for reading all data from DataBase
exports.readData =async (req, res) =>{
    const response = await productServices.readAllProductItem();
    res.send(response)
}

//readIdItem function for reading Item according to ID
exports.readIdItem =async (req, res) =>{
    const response = await productServices.readSingleItemId(req.params);
    res.send(response)
}

//readDiscountItem function for reading data only exists isDiscount 
exports.readDiscountItem = async (req, res) =>{
    const response = await productServices.readDiscountFilterItem();
    res.send(response)
    }

// Update the item, unconditionally,
exports.updateData =async (req, res) =>{
    const response = await productServices.updateItemId(req.params);
    res.send(response)
}

//function deleteData used for delete Item
exports.deleteData = async (req, res) => {
    const response = await productServices.deleteItemId(req.params)
    res.send(response)
}

