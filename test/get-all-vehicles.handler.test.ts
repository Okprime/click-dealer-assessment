import * as getAllVehiclesMock from  "../src/functions/get-all-vehicles/handler";

describe('getAllVehicles', function () {
    it('should get all vehicles', async () => {

        const result = {
            "message": "Success",
            "data": [
                {
                    "model": "Test model",
                    "reg": "AB22 ABC",
                    "registrationDate": "23/12/22",
                    "vehicleId": "da6be9bb-0308-424b-b7e5-b2b480503438",
                    "updatedAt": "2022-12-27T19:42:14.687Z",
                    "createdAt": "2022-12-27T19:42:14.687Z",
                    "make": "Test make"
                }
            ]
        }

        const response = jest.spyOn(getAllVehiclesMock, 'getAllVehicles')
        .mockImplementation(async () => result as any);

        const res = await getAllVehiclesMock.getAllVehicles();
        expect(await response).toHaveBeenCalledTimes(1);
    });
});
