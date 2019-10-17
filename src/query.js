const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');
const { itemList } = require('./types.js');

const allPrograms = require('../program_data/items.json');
const items = allPrograms.items;

//Define the Query
const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    allItems: {
      type: itemList,
      args: {
        workoutTypes: { type: new GraphQLList(GraphQLString) },
        trainers: { type: new GraphQLList(GraphQLString) },
        programIntensity : { type: new GraphQLList(GraphQLString) }
      },
      resolve: function(source, args) {
        return (function(args, items) {
          return items.filter(function(item) {
            if(args.workoutTypes != undefined) {
              return item.workoutType.some(type => args.workoutTypes.includes(type.title));
            } else {
              return item;
            }
          }).filter(function(item) {
            if(args.trainers != undefined) {
              return item.trainers.some(trainer => args.trainers.includes(trainer.title));
            } else {
              return item;
            }
          }).filter(function(item){
            if(args.programIntensity != undefined) {
              return args.programIntensity.includes(item.programIntensity.title);
            } else {
              return item;
            }
          })
        })(args, items);
      }
    }
  }
});

exports.Query = Query;
