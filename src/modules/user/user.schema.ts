import { gql } from "apollo-server-express";

export const UserTypeDefs = gql`
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
