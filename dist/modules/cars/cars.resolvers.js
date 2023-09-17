"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarResolvers = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const graphql_upload_ts_1 = require("graphql-upload-ts");
const users_model_1 = __importDefault(require("../../models/users.model"));
exports.CarResolvers = {
    Query: {
        users: async () => {
            const data = await users_model_1.default.findAll();
            return { status: 201, data };
        },
    },
    Mutation: {
        fileUpload: async (parent, ctx) => {
            try {
                let { filename, createReadStream } = await ctx.file;
                filename = Date.now() + filename.replace(/\s/g, "");
                const stream = createReadStream();
                const out = (0, fs_1.createWriteStream)((0, path_1.resolve)("uploads", filename));
                stream.pipe(out);
                return filename;
            }
            catch (error) {
                console.log(error);
            }
        },
        Put: async (parent, ctx) => {
            try {
                const { id, username, email, password } = ctx.user;
                await users_model_1.default.update({ username, email, password }, { where: id });
                return { status: 200, message: "Updated" };
            }
            catch (error) {
                console.log(error);
            }
        },
        Delete: async (parent, ctx) => {
            try {
                const { id } = ctx.user;
                await users_model_1.default.destroy({ where: id });
                return { status: 200, message: "Deleted" };
            }
            catch (error) {
                console.log(error);
            }
        },
    },
    Upload: graphql_upload_ts_1.GraphQLUpload,
};
