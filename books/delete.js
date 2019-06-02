"use strict";
const AWS = require("aws-sdk");
const client = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async function deleteBook(event, context, callback) {
  const params = {
    TableName: process.env.BOOKS_TABLE,
    Key: {
      id: event.pathParameters.id
    }
  };

  await client.delete(params).promise();

  const response = {
    statusCode: 200
  };

  return callback(null, response);
};
