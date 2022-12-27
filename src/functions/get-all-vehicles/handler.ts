import { formatJSONResponse } from '../../../src/libs/api-gateway';
import { APIGatewayProxyResult } from 'aws-lambda';
import dbService from '../../database/services';

export const getAllVehicles = async (): Promise<APIGatewayProxyResult> => {
    try {
        const vehicles = await dbService.getAllVehicles();

        return formatJSONResponse({
            message: 'Success',
            data: vehicles,
        }, 200);

    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: `An error occured: ${e}`
        }, 500);
    }
}