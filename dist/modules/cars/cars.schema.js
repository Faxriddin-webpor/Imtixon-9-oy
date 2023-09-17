"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarTypeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.CarTypeDefs = (0, apollo_server_express_1.gql) `
type Query {
  cars: [Car!]
}
  
type Car {
    id: Int
    marka: String
    tanirovka: String
    motor: Int
    year: Int
    color: String
    distance: Int
    gearbook: String
    description: String
    file: String
  
}
  
type Mutation {
  fileUpload(file: Upload!): String
  postCar: ( marka: String,tanirovka: String,motor: Int,year: Int,color: String,distance: Int,gearbook: String,description: String ): Response!
  deleteCar: ( id: Int ): Response!
}
  
type Response{
  status: Int
  message: String
}`;
