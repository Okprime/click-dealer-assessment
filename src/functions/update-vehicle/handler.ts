import { formatJSONResponse } from '@libs/api-gateway';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import dbService from '../../database/services';
import UpdateVehicle from './dto/update-vehicle.dto';


export const updateVehicle = async (event: APIGatewayProxyEvent & UpdateVehicle): Promise<APIGatewayProxyResult> => {
    try {
        const vehicleId: string = event.pathParameters.vehicleId
        const body = JSON.parse(event.body)

        const vehicle = await dbService.updateVehicle(vehicleId, body);

        return formatJSONResponse({
            message: 'Success',
            data: vehicle,
        }, 200);

    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: `An error occured: ${e}`
        }, 500);
    }
}