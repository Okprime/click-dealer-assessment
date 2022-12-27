import { formatJSONResponse } from '../../libs/api-gateway';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import dbService from '../../database/services';

export const deleteVehicle = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const vehicleId = event.pathParameters.vehicleId;
        await dbService.deleteVehicle(vehicleId);

        return formatJSONResponse({
            message: `Vehicle with id ${vehicleId} has been deleted successfully`,
        }, 200);

    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: `An error occured: ${e}`
        }, 500);
    }
}