import { createWriteStream } from "fs";
import { resolve } from "path";
import { GraphQLUpload } from "graphql-upload-ts";
import User from "../../models/users.model";
export const CarResolvers = {
  Query: {
    users: async () => {
      const data = await User.findAll();
      return { status: 201, data };
    },
  },
  Mutation: {
    fileUpload: async (parent: any, ctx: any) => {
      try {
        let { filename, createReadStream } = await ctx.file;
        filename = Date.now() + filename.replace(/\s/g, "");
        const stream = createReadStream();
        const out = createWriteStream(resolve("uploads", filename));
        stream.pipe(out);

        return filename;
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
  Upload: GraphQLUpload,
};
