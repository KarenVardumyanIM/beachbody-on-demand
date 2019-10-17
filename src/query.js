const { GraphQLObjectType, GraphQLString } = require('graphql');
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
        workoutType: { type: GraphQLString }
      },
      resolve: function(source, args) {
        return (function(args , items) {
          return items.filter(function(obj) {
            return obj.workoutType.some(function(type){
              return type.title == args.workoutType;
            });
          })
        })(args, items);
      }
    }
  }
});

exports.Query = Query;
