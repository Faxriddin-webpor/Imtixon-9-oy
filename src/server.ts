import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express, { Request, Response } from "express";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import { graphqlUploadExpress } from "graphql-upload-ts";
import { UserTypeDefs } from "./modules/user/user.schema";
import { CarTypeDefs } from "./modules/cars/cars.schema";
import { UserResolvers } from "./modules/user/user.resolver";
import { CarResolvers } from "./modules/cars/cars.resolvers";

const app = express();
const httpServer = http.createServer(app);

!(async function () {
  const server = new ApolloServer({
    typeDefs: [UserTypeDefs, CarTypeDefs],
    resolvers: [UserResolvers, CarResolvers],
    csrfPrevention: false,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    "/graphql",
    graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 1 }),
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server)
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/`);
})();
