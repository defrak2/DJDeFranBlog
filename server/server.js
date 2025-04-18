const express = require('express');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
// const typeDefs = require('./schemas');
// const resolvers = require('./resolvers');
const db = require('./config/connection');
// const { authMiddleware } = require('./utils/auth');  // Import the authMiddleware

const PORT = process.env.PORT || 3001;
const app = express();

// Create a new instance of an Apollo server with the GraphQL schema
const server = new ApolloServer({
  // typeDefs,
  // resolvers,
  context: ({ req }) => authMiddleware({ req }),  // Apply authMiddleware in the context
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.get('/hello', (req, res) => {
    res.json('Hello world')
  })


  // Apply the Apollo GraphQL middleware and set the path to /graphql
  server.applyMiddleware({ app, path: '/graphql' });

  if (process.env.NODE_ENV === 'production') {
    // Serve static files from the React app's build folder
    app.use(express.static(path.join(__dirname, '../client/build')));
  
    app.get('/test', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
    
    // All other GET requests should return the React app's index.html file
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🚀 API server running on port ${PORT}!`);
      console.log(`🚀 Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

// Call the async function to start the server
startApolloServer();
