const express = require('express');
const path = require('path');
const db = require('./config/connection');
//const routes = require('./routes');
//Adding ApolloServer, typeDefs, resolvers, middleware


const app = express();
const PORT = process.env.PORT || 3001;

//New Apollo Server initiation

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

//Start Apollo Server using GraphQL Schema

//app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});

//Start server
