const { gql } = require('apollo-server-express');
const resolvers = require('../resolvers');

const typeDefs = gql`
  type AudioFile {
    _id: ID!
    fileName: String!
    title: String!
    description: String
    uploadedBy: ID!
    s3Key: String!
    s3Url: String!
    tags: [String]
    createdAt: String
    updatedAt: String
  }

  input AudioFileInput {
    fileName: String!
    title: String!
    description: String
    uploadedBy: ID!
    s3Key: String!
    s3Url: String!
    tags: [String]
  }

  type Query {
    audioFiles: [AudioFile]
    audioFile(id: ID!): AudioFile
  }

  type Mutation {
    addAudioFile(input: AudioFileInput!): AudioFile
  }
`;

module.exports = { typeDefs, resolvers };