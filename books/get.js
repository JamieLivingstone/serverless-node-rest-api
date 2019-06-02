"use strict";
const AWS = require("aws-sdk");
const client = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async function getBook(event, context, callback) {
  const params = {
    TableName: process.env.BOOKS_TABLE,
    Key: {
      id: event.pathParameters.id
    }
  };

  const { Item } = await client.get(params).promise();

  const response = {
    statusCode: Item ? 200 : 404,
    body: JSON.stringify(Item ? Item : { message: "Book not found!" })
  };

  callback(null, response);
};
