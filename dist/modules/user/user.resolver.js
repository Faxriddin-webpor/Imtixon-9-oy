"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolvers = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_model_1 = __importDefault(require("../../models/users.model"));
exports.UserResolvers = {
    Query: {
        users: async () => {
            const data = await users_model_1.default.findAll();
            return { status: 201, data };
        },
    },
    Mutation: {
        Register: async (parent, ctx) => {
            try {
                const user = await users_model_1.default.create({
                    username: ctx.username,
                    email: ctx.email,
                    password: ctx.password,
                });
                const token = jsonwebtoken_1.default.sign({ email: ctx.email, password: ctx.password }, "olma");
                return {
                    status: 201,
                    message: "User created",
                    token,
                };
            }
            catch (error) {
                console.log(error);
            }
        },
        Login: async (parent, ctx) => {
            try {
                const user = users_model_1.default.findOne({ where: ctx.email && ctx.password });
                if (!user) {
                    return { status: 400, message: "User is not found!", token: null };
                }
                const token = jsonwebtoken_1.default.sign({ email: ctx.email, password: ctx.password }, "olma");
                return {
                    status: 200,
                    message: "Ok",
                    token,
                };
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
};
