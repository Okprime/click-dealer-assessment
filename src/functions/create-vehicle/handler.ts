import { formatJSONResponse } from '../../libs/api-gateway';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import dbService from '../../database/services';
import * as uuid from "uuid";
import CreateVehicle from './dto/create-vehicle.dto';
import VehicleModel from '../../model/vehicleModel';
import { parse } from 'date-fns';



export const createVehicle = async (event: APIGatewayProxyEvent & CreateVehicle): Promise<APIGatewayProxyResult> => {
    try {
        const { make, model, reg, registrationDate } = JSON.parse(event.body)


        // Ensure all the fields are passed
        if (!make || !model || !reg || !registrationDate) {
        return formatJSONResponse({
            status: 400,
            message: `Missing field(s): make || model || reg || registrationDate are all required`
        }, 400)};

        // Ensure the date passed is in the right format
        const formattedBirthdate = parse(registrationDate, 'mm/dd/yyyy', new Date());
        if (formattedBirthdate.toString() === 'Invalid Date') {
          return formatJSONResponse({
            status: 400,
            message: 'Invalid date format, it has to be in this format: dd/mm/yyyy'
        }, 400);
        }

        // Generate a unique id and save the vehicle information
        const vehicleId: string = uuid.v4();
        const vehicle: VehicleModel = await dbService.createVehicle({
          vehicleId,
          make,
          model,
          reg,
          registrationDate,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });

        return formatJSONResponse({
            message: 'Data persisted to the database successfully',
            data: vehicle,
        }, 200);

    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: `An error occured: ${e}`
        }, 500);
    }
}