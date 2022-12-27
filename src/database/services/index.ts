import createDynamoDBClient from "../database.connection";
import DBService from "./dbService";

// const { VEHICLE_TABLE } = process.env;

const dbService = new DBService(createDynamoDBClient(), 'VEHICLE');

export default dbService;
