const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookid: ID!
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Auth {
    token: Id!
    user: user
  }
`;

module.exports = typeDefs;
