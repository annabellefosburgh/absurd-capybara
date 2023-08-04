//Require apollo server
const { gql } = require("apollo-server-express");

//typedefs = User, Book, BookInput, Auth, Query, Mutation
//Query: me: user
//Mutation: login, adduser, savebook, removebook
//User: id, username, email, bookcount, savedbooks
//Book: bookid, authors, description, title, image, link
//Auth: token, user

const typeDefs = gql`

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    removeBook(bookId: ID!): User
}

  type User {
    _id: ID!
    username: String!
    email: String
    bookCount: Int
    savedBooks: [Book]
}

type Book {
    bookId: ID!
    authors: [String]
    description: String
    title: String!
    image: String
    link: String
}

input BookInput {
    bookId: String!
    authors: [String]
    title: String!
    description: String!
    image: String
    link: String
}


type Auth {
    token: ID!
    user: User
}

`;


module.exports = typeDefs;
