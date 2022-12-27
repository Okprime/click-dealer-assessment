import { handlerPath } from '@libs/handler-resolver';

export const getVehicleById = {
  handler: `${handlerPath(__dirname)}/handler.getVehicleById`,
  events: [
    {
      http: {
        method: 'get',
        path: 'vehicle/{vehicleId}',
        cors: true
      },
    },
  ],
};
