const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = require('graphql');

//Define quries data types
shortDescriptionType = new GraphQLObjectType({
  name: 'shortDescriptionType',
  fields: {
    rendered: { type: GraphQLString },
    raw: { type: GraphQLString }
  }
});

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

exports.itemList = itemList;
