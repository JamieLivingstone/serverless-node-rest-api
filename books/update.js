"use strict";
const AWS = require("aws-sdk");
const client = new AWS.DynamoDB.DocumentClient();
const { validateModel } = require("./schema");

module.exports.handler = async function updateBook(event, context, callback) {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  // Verify the request is valid
  const validation = validateModel(data);

  if (validation.error) {
    const response = {
      statusCode: 400,
      body: JSON.stringify(validation.error.details)
    };

    return callback(null, response);
  }

  // Update item in database
  const params = {
    TableName: process.env.BOOKS_TABLE,
    Key: {
      id: event.pathParameters.id
    },
    ExpressionAttributeValues: {
      ":updated_at": timestamp,
      ":title": data.title,
      ":author": data.author,
      ":pages": data.pages
    },
    UpdateExpression: "SET updated_at = :updated_at, title = :title, author = :author, pages = :pages",
    ReturnValues: "ALL_NEW"
  };

  const result = await client.update(params).promise();

  // Response to client
  const response = {
    statusCode: 200,
    body: JSON.stringify(result.Attributes)
  };

  return callback(null, response);
};
