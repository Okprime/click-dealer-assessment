import { handlerPath } from '@libs/handler-resolver';

export const deleteVehicle = {
  handler: `${handlerPath(__dirname)}/handler.deleteVehicle`,
  events: [
    {
      http: {
        method: 'delete',
        path: 'delete-vehicle/{vehicleId}',
        cors: true
      },
    },
  ],
};
