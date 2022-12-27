import * as AWS from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

AWS.config.update({region:'us-east-1'});

const createDynamoDBClient = (): DocumentClient => {
  return new AWS.DynamoDB.DocumentClient();
};

export default createDynamoDBClient;
