"use strict";
const AWS = require("aws-sdk");
const client = new AWS.DynamoDB.DocumentClient();
const uuid = require("uuid");
const { validateModel } = require("./schema");

module.exports.handler = async function createBook(event, context, callback) {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  const validation = validateModel(data);

  if (validation.error) {
    const response = {
      statusCode: 400,
      body: JSON.stringify(validation.error.details)
    };

    return callback(null, response);
  }

  const params = {
    TableName: process.env.BOOKS_TABLE,
    Item: {
      id: uuid.v1(),
      created_at: timestamp,
      updated_at: timestamp,
      title: data.title,
      author: data.author,
      pages: data.pages
    }
  };

  await client.put(params).promise();

  const response = {
    statusCode: 201,
    body: JSON.stringify(params.Item)
  };

  return callback(null, response);
};
