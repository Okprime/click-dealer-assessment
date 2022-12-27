import { APIGatewayProxyEvent } from "aws-lambda";
import CreateVehicle from "../src/functions/create-vehicle/dto/create-vehicle.dto";
import * as createVehicleMock from  "../src/functions/create-vehicle/handler";

describe('createVehicle', function () {
    it('save a vehicle', async () => {
        const event: APIGatewayProxyEvent & CreateVehicle = {
            body: "{\n \"make\":\"Lexus\",\n\"model\":\"Lexus\"\n,\n\"reg\":\"Lexus\"\n,\n\"registrationDate\":\"Lexus\"\n}",
        } as any

        const result = {
            "message": "Data persisted to the database successfully",
            "data": {
                "vehicleId": "74c10147-c19c-4f4f-aa40-d80eebec9cb3",
                "make": "Lexus",
                "model": "Lexus",
                "reg": "Lexus",
                "registrationDate": "Lexus",
                "createdAt": "2022-12-27T17:10:40.335Z",
                "updatedAt": "2022-12-27T17:10:40.335Z"
            }
        }

        jest.spyOn(createVehicleMock, 'createVehicle')
        .mockImplementation(async () => result as any);

        const res = await createVehicleMock.createVehicle;

        expect(await res).toHaveBeenCalledTimes(0)
        expect(await res(event)).toEqual(result)
        expect(await res).toHaveBeenCalledWith(event)
    });

    it('should throw an error when a field is not passed', async () => {
        const event: APIGatewayProxyEvent & CreateVehicle = {
            body: "{\n\"model\":\"Lexus\"\n,\n\"reg\":\"Lexus\"\n,\n\"registrationDate\":\"Lexus\"\n}",
        } as any

        const result = {
        "status": 400,
        "message": "Missing field(s): make || model || reg || registrationDate are all required"
        }

        jest.spyOn(createVehicleMock, 'createVehicle')
        .mockImplementation(async () => result as any);

        const res = await createVehicleMock.createVehicle;

        expect(await res).toHaveBeenCalledTimes(1)
        expect(await res(event)).toEqual(result)
        expect(await res).toHaveBeenCalledWith(event)
    });
});
