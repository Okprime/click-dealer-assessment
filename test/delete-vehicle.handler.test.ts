import { APIGatewayProxyEvent } from "aws-lambda";
import * as deleteVehicleMock from  "../src/functions/delete-vehicle/handler";

describe('deleteVehicle', function () {
    it('should delete vehicle by its id', async () => {

        const event: APIGatewayProxyEvent = {
            pathParameters: {
                vehicleId: ''
            }
        } as any

        const result = {
            "message": `Vehicle with id ${event} has been deleted successfully`
        }
    
        const response = jest.spyOn(deleteVehicleMock, 'deleteVehicle')
        .mockImplementation(async () => result as any);

        const res = await deleteVehicleMock.deleteVehicle(event);
        // expect(await response).toHaveBeenCalledWith(event);
        expect(await response).toHaveBeenCalledTimes(1);
    });
});
