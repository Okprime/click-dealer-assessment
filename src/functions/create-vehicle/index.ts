import { handlerPath } from '@libs/handler-resolver';

export const createVehicle = {
  handler: `${handlerPath(__dirname)}/handler.createVehicle`,
  events: [
    {
      http: {
        method: 'post',
        path: 'create-vehicle',
        cors: true
      },
    },
  ],
};
