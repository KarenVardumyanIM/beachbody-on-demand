const {
  GraphQLObjectType,
  GraphQLString,
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

workoutType = new GraphQLObjectType({
  name: 'workoutType',
  fields: {
    id: { type: GraphQLString },
    title: { type: GraphQLString }
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
