import { handlerPath } from '@libs/handler-resolver';

export const updateVehicle = {
  handler: `${handlerPath(__dirname)}/handler.updateVehicle`,
  events: [
    {
      http: {
        method: 'put',
        path: 'update-vehicle/{vehicleId}',
        cors: true
      },
    },
  ],
};
