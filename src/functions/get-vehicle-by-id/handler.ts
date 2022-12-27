import { formatJSONResponse } from '../../libs/api-gateway';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import dbService from '../../database/services';

export const getVehicleById = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const vehicleId = event.pathParameters.vehicleId
        const vehicle = await dbService.getVehicleById(vehicleId);

        if (vehicle === undefined) {
            return formatJSONResponse({
                status: 404,
                message: `Document with vehicleId: ${vehicleId} not found`,
            }, 404);
        }

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