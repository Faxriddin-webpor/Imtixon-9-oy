import { gql } from "apollo-server-express";

export const CarTypeDefs = gql`
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
