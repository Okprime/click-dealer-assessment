import { DocumentClient } from "aws-sdk/clients/dynamodb";
import VehicleModel from "../../model/vehicleModel";

class DBService {
  constructor(
    private readonly docClient: DocumentClient,
    private readonly tableName: string
  ) {}

  async getAllVehicles(): Promise<VehicleModel[]> {
    try {
        const result = await this.docClient
        .scan({
          TableName: this.tableName,
        })
        .promise();
  
      return result.Items as VehicleModel[]
    } catch (error) {
        console.log('get-all-vehicles-error', error);
    }
  }

  async getVehicleById(vehicleId: string): Promise<VehicleModel> {
    try {
        const result = await this.docClient
        .get({
          TableName: this.tableName,
          Key: { vehicleId },
        })
        .promise();

      return result.Item as VehicleModel
    } catch (error) {
        console.log('error-not-found', error);
    }
  }

  async createVehicle(vehicle: VehicleModel): Promise<VehicleModel> {
    try {
        await this.docClient
        .put({
          TableName: this.tableName,
          Item: vehicle,
        })
        .promise();
  
      return vehicle;
    } catch (error) {
        console.log('create-vehicle-error', error);
    }
  }

  async updateVehicle(vehicleId: string, partialPost: Partial<VehicleModel>): Promise<VehicleModel> {
    try {
        const updated = await this.docClient
        .update({
          TableName: this.tableName,
          Key: { vehicleId },
          UpdateExpression:
            "SET #make = :make, #model = :model, #reg = :reg, #registrationDate = :registrationDate",
          ExpressionAttributeNames: {
            "#make": "make",
            "#model": "model",
            "#reg": "reg",
            "#registrationDate": "registrationDate",
          },
          ExpressionAttributeValues: {
            ":make": partialPost.make,
            ":model": partialPost.model,
            ":reg": partialPost.reg,
            ":registrationDate": partialPost.registrationDate,
          },
          ReturnValues: "ALL_NEW",
        })
        .promise();
  
      return updated.Attributes as VehicleModel
    } catch (error) {
        console.log('update-vehicle-error', error);
    }
  }

  async deleteVehicle(vehicleId: string) {
    try {
        return this.docClient
        .delete({
          TableName: this.tableName,
          Key: { vehicleId },
        })
        .promise();
    } catch (error) {
        console.log('delete-vehicle-error', error)
    }
  }
}

export default DBService;
