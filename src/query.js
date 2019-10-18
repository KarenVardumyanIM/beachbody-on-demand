const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');
const { _itemsList, _filtersList } = require('./types.js');

const allFiltersData = require('../program_data/filters.json');
const allProgramsData = require('../program_data/items.json');
const items = allProgramsData.items;

//Define the Query
const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    allItems: {
      type: _itemsList,
      args: {
        workoutTypes: { type: new GraphQLList(GraphQLString) },
        trainers: { type: new GraphQLList(GraphQLString) },
        programIntensity : { type: new GraphQLList(GraphQLString) }
      },
      resolve: function(source, args) {
        return (function(args, items) {
          return items.filter(function(item) {
            if(args.workoutTypes !== undefined) {
              return item.workoutType.some(type => args.workoutTypes.includes(type.title));
            } else {
              return item;
            }
          }).filter(function(item) {
            if(args.trainers !== undefined) {
              return item.trainers.some(trainer => args.trainers.includes(trainer.title));
            } else {
              return item;
            }
          }).filter(function(item){
            if(args.programIntensity !== undefined) {
              return args.programIntensity.includes(item.programIntensity.title);
            } else {
              return item;
            }
          })
        })(args, items);
      }
    },
    allFilters: {
      type: _filtersList,
      resolve() {
        return allFiltersData;
      }
    }
  }
});

exports.Query = Query;
