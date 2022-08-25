const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../../client/utils/auth");

const resolvers = {
  Query: {
    me: async () => {
      return User.find({});
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user exists with this email");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password");
      }

      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (parent, { bookData }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $push: { savedBooks: bookData },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("Please log in!");
    },

    removeBook: async (parent, { bookData }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user.id },
          { $pull: { savedBooks: { bookData } } },
          { new: true }
        );
      }
      throw new AuthenticationError("Please log in!");
    },
  },
};

module.exports = resolvers;
