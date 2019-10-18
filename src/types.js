const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = require('graphql');

//Define common data types

imgType = new GraphQLObjectType({
  name: 'imgType',
  fields: {
    url: { type: GraphQLString },
    sourceUrl: { type: GraphQLString },
    file: { type: GraphQLString },
    width: { type: GraphQLInt },
    height: { type: GraphQLInt },
    mimeType: { type: GraphQLString }
  }
});

webImagesType = new GraphQLObjectType({
  name: 'webImagesType',
  fields: {
    desktop: { type: imgType },
    mobile: { type: imgType },
    tablet: { type: imgType }
  }
});

//Define quries data types for Items

shortDescriptionType = new GraphQLObjectType({
  name: 'shortDescriptionType',
  fields: {
    rendered: { type: GraphQLString },
    raw: { type: GraphQLString }
  }
});

trainerType = new GraphQLObjectType({
  name: 'trainersType',
  fields: {
    slug: { type: GraphQLString },
    title: { type: GraphQLString }
  }
});

itemType = new GraphQLObjectType({
  name: 'itemType',
  fields: {
    title: { type: GraphQLString },
    shortDescription: { type: shortDescriptionType },
    mainImage: {
      type: webImagesType,
      resolve(source) {
        return source.images.main.web;
      }
     },
    programIntensity: {
      type: webImagesType,
      resolve(source) {
        return source.programIntensity.images.web;
      }
    },
    trainers: {
      type: new GraphQLList(trainerType),
      resolve(source) {
        return source.trainers;
      }
    }
  }
});

itemList = new GraphQLList(itemType);

// Define quries data types for Filters

programTypeFilter = new GraphQLObjectType({
  name: 'programTypeFilter',
  fields: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    count: { type: GraphQLInt },
    images: {
      type: webImagesType,
      resolve(source) {
        return source.images.web;
      }
    }
  }
});

trainerTypeFilter = new GraphQLObjectType({
  name: 'trainerTypeFilter',
  fields: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    count: { type: GraphQLInt },
    images: {
      type: webImagesType,
      resolve(source) {
        return source.images.web;
      }
    }
  }
});

filters = new GraphQLObjectType({
  name: 'filters',
  fields: {
    programTypes: {
      type: new GraphQLList(programTypeFilter),
      resolve(source) {
        return source.programType;
      }
    },
    trainers: {
      type: new GraphQLList(trainerTypeFilter),
      resolve(source) {
        return source.trainer;
      }
    }
  }
});

exports.itemList = itemList;
exports.filters = filters;

