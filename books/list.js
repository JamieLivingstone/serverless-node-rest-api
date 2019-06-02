"use strict";
const AWS = require("aws-sdk");
const client = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async function listBooks(event, context, callback) {
  const params = {
    TableName: process.env.BOOKS_TABLE
  };

  const { Items = [] } = await client.scan(params).promise();

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(Items)
  });
};
