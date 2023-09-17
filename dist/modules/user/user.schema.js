"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTypeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.UserTypeDefs = (0, apollo_server_express_1.gql) `
type Query {
  users: [User!]
}

type User {
  name: String
  email: String
  password: String
}

type Mutation {
  Register: ( username: String, email: String, password: String ): Response2!
  Login: ( email: String, password: String ): Response2!
  Put: ( id: Int , username: String, email: String, password: String ): Response!
  Delete: ( id: Int ): Response!
}

type Response{
  status: Int
  message: String
}

type Response2{
  status: Int
  message: String
  token: String
}
`;
