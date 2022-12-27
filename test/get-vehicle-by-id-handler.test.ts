import { APIGatewayProxyEvent } from "aws-lambda";
import * as getVehicleByIdMock from  "../src/functions/get-vehicle-by-id/handler";

describe('getAllVehicles', function () {
    it('should get vehicle by its id', async () => {

        const event: APIGatewayProxyEvent = {
            pathParameters: {
                vehicleId: ''
            }
        } as any

        const result = {
            "message": "Success",
            "data": {
                "model": "Fiesta",
                "reg": "AB22 ABC",
                "registrationDate": "23/12/22",
                "vehicleId": "da6be9bb-0308-424b-b7e5-b2b480503438",
                "updatedAt": "2022-12-27T19:42:14.687Z",
                "createdAt": "2022-12-27T19:42:14.687Z",
                "make": "Ford"
            }
        }
    
        const response = jest.spyOn(getVehicleByIdMock, 'getVehicleById')
        .mockImplementation(async () => result as any);

        const res = await getVehicleByIdMock.getVehicleById(event);
        expect(await response).toHaveBeenCalledWith(event);
        expect(await response).toHaveBeenCalledTimes(1);
    });
});
