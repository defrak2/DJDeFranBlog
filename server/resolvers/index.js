const { AudioFile } = require('../models');

const resolvers = {
  Query: {
    audioFiles: async () => {
      return await AudioFile.find().populate('uploadedBy');
    },
    audioFile: async (_, { id }) => {
      return await AudioFile.findById(id).populate('uploadedBy');
    }
  },
  Mutation: {
    addAudioFile: async (_, { input }) => {
      const newFile = await AudioFile.create(input);
      return newFile;
    }
  }
};

module.exports = resolvers;