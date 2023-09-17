import jwt from "jsonwebtoken";
import User from "../../models/users.model";
export const UserResolvers = {
  Query: {
    users: async () => {
      const data = await User.findAll();
      return { status: 201, data };
    },
  },
  Mutation: {
    Register: async (parent: any, ctx: any) => {
      try {
        const user = await User.create({
          username: ctx.username,
          email: ctx.email,
          password: ctx.password,
        });
        const token = jwt.sign(
          { email: ctx.email, password: ctx.password },
          "olma"
        );
        return {
          status: 201,
          message: "User created",
          token,
        };
      } catch (error) {
        console.log(error);
      }
    },

    Login: async (parent: any, ctx: any) => {
      try {
        const user = User.findOne({ where: ctx.email && ctx.password });
        if (!user) {
          return { status: 400, message: "User is not found!", token: null };
        }
        const token = jwt.sign(
          { email: ctx.email, password: ctx.password },
          "olma"
        );
        return {
          status: 200,
          message: "Ok",
          token,
        };
      } catch (error) {
        console.log(error);
      }
    },
    Put: async (parent: any, ctx: any) => {
      try {
        const { id, username, email, password } = ctx.user;
        await User.update({ username, email, password }, { where: id });
        return { status: 200, message: "Updated" };
      } catch (error) {
        console.log(error);
      }
    },
    Delete: async (parent: any, ctx: any) => {
      try {
        const { id } = ctx.user;
        await User.destroy({ where: id });
        return { status: 200, message: "Deleted" };
      } catch (error) {
        console.log(error);
      }
    },
  },
};
