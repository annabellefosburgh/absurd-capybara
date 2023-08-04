const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
//Adding ApolloServer, typeDefs, resolvers, middleware
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");


const app = express();
const PORT = process.env.PORT || 3000;

//New Apollo Server initiation
const server = new ApolloServer({
  typeDefs,
  resolvers, 
  context: authMiddleware,
  persistedQueries: false, 
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

//Start Apollo Server using GraphQL Schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`Server now running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
    });
  });
};


app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});

//Start server
startApolloServer(typeDefs, resolvers);