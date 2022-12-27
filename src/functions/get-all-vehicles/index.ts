import { handlerPath } from '@libs/handler-resolver';

export const getAllVehicles = {
  handler: `${handlerPath(__dirname)}/handler.getAllVehicles`,
  events: [
    {
      http: {
        method: 'get',
        path: 'vehicles',
        cors: true
      },
    },
  ],
};
