import type { AWS } from '@serverless/typescript';

import { createVehicle } from '@functions/create-vehicle';
import { getAllVehicles } from '@functions/get-all-vehicles';
import { deleteVehicle } from '@functions/delete-vehicle';
import { updateVehicle } from '@functions/update-vehicle';
import { getVehicleById } from '@functions/get-vehicle-by-id';

const serverlessConfiguration: AWS = {
  service: 'click-dealer-assessment',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-dynamodb-local'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },

    iam: {
      role: {
        statements:[
          {
            Effect: "Allow",
            Action: [
              "dynamodb:DescribeTable",
              "dynamodb:Query",
              "dynamodb:Scan",
              "dynamodb:GetItem",
              "dynamodb:PutItem",
              "dynamodb:DeleteItem",
              "dynamodb:UpdateItem",
            ],
            Resource: "arn:aws:dynamodb:*:*:table/VEHICLE"          
          }
        ],
      },

    },
  },
  // import the function via paths
  functions: { createVehicle, getAllVehicles, deleteVehicle, updateVehicle, getVehicleById },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    dynamodb: {
      start: {
        port: 5000,
        inMemory: true,
      },
      stages: [
        "dev"
      ]
    }
  },

  resources: {
    Resources: {
      VehicleListTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "VEHICLE",
          AttributeDefinitions: [
            {
              AttributeName: "vehicleId",
              AttributeType: "S"
            },
          ],
          KeySchema: [
            {
              AttributeName: "vehicleId",
              KeyType: "HASH"
            }
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          }
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;
