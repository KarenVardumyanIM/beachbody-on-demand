const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require("graphql");

//Define quries data types
shortDescriptionType = new GraphQLObjectType({
  name: "shortDescriptionType",
  fields: {
    rendered: { type: GraphQLString },
    raw: { type: GraphQLString }
  }
});

workoutType = new GraphQLObjectType({
  name: "workoutType",
  fields: {
    id: { type: GraphQLString },
    title: { type: GraphQLString }
  }
});

itemType = new GraphQLObjectType({
  name: "itemType",
  fields: {
    title: { type: GraphQLString },
    shortDescription: { type: shortDescriptionType }
  }
});

itemList = new GraphQLList(itemType);

exports.itemList = itemList;
