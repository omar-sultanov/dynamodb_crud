const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');
require('dotenv').config()
AWS.config.update({
    region: "us-east-1",
    accessKeyId:process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

const docClient = new AWS.DynamoDB.DocumentClient();
    const table = "Product";

exports.addProduct=async (req,res)=>{
    var params = {
        TableName:table,
        Item:{
            "productId": uuidv4(),
            "stock": 2,
            "productName":"Laptops",
            "isDiscount":true,
            "category":{
                "categoryId": 5,
                "categoryName": "Asus"
            }
        }
    };

    try {
        await docClient.put(params).promise()
        return {
            status:true,
            message:"Added item"
        }
    } catch (error) {
        return {
            status:false,
            message:"Error, Unable to add item."
        }
    }

}

exports.readAllProductItem =async (req,res) =>{
    const params = {
        TableName: table,
        Select:"ALL_ATTRIBUTES"
    };
    try {
       const items = await docClient.scan(params).promise()
        return{
            status:true,
            message:items
        }
    } catch (error) {
        return{
            status:false,
            message:"Unable to read item"
        }
    }

}

exports.readSingleItemId = async (req, res) =>{
    const findItemId = "bea7d671-375a-464b-b62c-2965c265bfbf"
    const params = {
        TableName: table,
        Key:{
            productId: req.id
        }
    };
    try {
       const item = await docClient.get(params).promise();
       return{
           status:true,
           message:item
       }
      
    } catch (error) {
        return{
            status:false,
            message:"Unable to read item"
        }
    }
}

exports.readDiscountFilterItem = async (req, res) =>{
    const params = {
        TableName: table,
        FilterExpression: "attribute_exists(isDiscount)"
        
    };
    try {
       const discountItem = await docClient.scan(params).promise()
        return {
            status:true,
            message:discountItem
        }
    } catch (error) {
        return{
            status:false,
            message:"Unable to read item"
        }
    }
}

exports.updateItemId = async (req, res) =>{
    const updateItemId = "b6908e7a-ed9e-47be-af3b-19ebb9f565b6"
const params = {
    TableName:table,
    Key:{
        productId: req.id
    },
    UpdateExpression: "set category.categoryId = :i, category.categoryName=:n",
    ExpressionAttributeValues:{
        ":i":8,
        ":n":"HP"
    },
    ReturnValues:"UPDATED_NEW"
};
try {
    const updateItem = await docClient.update(params).promise();
    return{
        status:true,
        message:updateItem
    }
} catch (error) {
    return{
        status:false,
        message:"Unable to update item."
    }
}
}

exports.deleteItemId = async (req, res) =>{
    const params = {
        TableName:table,
        Key:{
            productId:req.id
        },
        //only if that item does not already have an attribute named isDiscount
        ConditionExpression:"attribute_not_exists(isDiscount)",
        "ReturnValues": "ALL_OLD"
    };
    
// Attempting a conditional delete.
    try {
        await docClient.delete(params).promise();
        return{
            status:true,
            message:"DeleteItem succeeded"
        }
    } catch (error) {
        return{
            status:false, 
            message:"Unable to delete item or isDiscount is undefined"
        }
    }    
}