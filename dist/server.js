"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const http_1 = __importDefault(require("http"));
const graphql_upload_ts_1 = require("graphql-upload-ts");
const user_schema_1 = require("./modules/user/user.schema");
const cars_schema_1 = require("./modules/cars/cars.schema");
const user_resolver_1 = require("./modules/user/user.resolver");
const cars_resolvers_1 = require("./modules/cars/cars.resolvers");
const app = (0, express_1.default)();
const httpServer = http_1.default.createServer(app);
!(async function () {
    const server = new server_1.ApolloServer({
        typeDefs: [user_schema_1.UserTypeDefs, cars_schema_1.CarTypeDefs],
        resolvers: [user_resolver_1.UserResolvers, cars_resolvers_1.CarResolvers],
        csrfPrevention: false,
        plugins: [(0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
    });
    await server.start();
    app.use("/graphql", (0, graphql_upload_ts_1.graphqlUploadExpress)({ maxFileSize: 10000000, maxFiles: 1 }), (0, cors_1.default)(), express_1.default.json(), (0, express4_1.expressMiddleware)(server));
    await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000/`);
})();
