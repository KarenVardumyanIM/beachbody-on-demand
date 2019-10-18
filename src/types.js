const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = require('graphql');

//Define common data types

_imgType = new GraphQLObjectType({
  name: '_imgType',
  fields: {
    url: { type: GraphQLString },
    sourceUrl: { type: GraphQLString },
    file: { type: GraphQLString },
    width: { type: GraphQLInt },
    height: { type: GraphQLInt },
    mimeType: { type: GraphQLString }
  }
});

_webImagesType = new GraphQLObjectType({
  name: '_webImagesType',
  fields: {
    desktop: { type: _imgType },
    mobile: { type: _imgType },
    tablet: { type: _imgType }
  }
});

//Define quries data types for Items

_shortDescriptionType = new GraphQLObjectType({
  name: '_shortDescriptionType',
  fields: {
    rendered: { type: GraphQLString },
    raw: { type: GraphQLString }
  }
});

_trainerType = new GraphQLObjectType({
  name: 'trainersType',
  fields: {
    slug: { type: GraphQLString },
    title: { type: GraphQLString }
  }
});

_programDurationType = new GraphQLObjectType({
  name: '_programDurationType',
  fields: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    images: {
      type: _webImagesType,
      resolve(source) {
        return source.images.web;
      }
    }
  }
});

_itemType = new GraphQLObjectType({
  name: '_itemType',
  fields: {
    title: { type: GraphQLString },
    shortDescription: { type: _shortDescriptionType },
    programDurationType: { type: GraphQLString },
    programDuration: {
      type: _programDurationType,
      resolve(source) {
        return source.programDuration;
      }
    },
    mainImage: {
      type: _webImagesType,
      resolve(source) {
        return source.images.main.web;
      }
     },
    programIntensity: {
      type: _webImagesType,
      resolve(source) {
        return source.programIntensity.images.web;
      }
    },
    trainers: {
      type: new GraphQLList(_trainerType),
      resolve(source) {
        return source.trainers;
      }
    }
  }
});

_itemsList = new GraphQLList(_itemType);

// Define quries data types for Filters

_filterItemType = new GraphQLObjectType({
  name: '_filterItemType',
  fields: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    count: { type: GraphQLInt },
    images: {
      type: _webImagesType,
      resolve(source) {
        return source.images.web;
      }
    }
  }
});

_filtersList = new GraphQLObjectType({
  name: '_filtersList',
  fields: {
    programTypes: {
      type: new GraphQLList(_filterItemType),
      resolve(source) {
        return source.programType;
      }
    },
    trainers: {
      type: new GraphQLList(_filterItemType),
      resolve(source) {
        return source.trainer;
      }
    },
    workoutLevels: {
      type: new GraphQLList(_filterItemType),
      resolve(source) {
        return source.workoutLevels;
      }
    },
    workoutDurationMaximum: {
      type: new GraphQLList(_filterItemType),
      resolve(source) {
        return source.workoutDurationMaximum;
      }
    },
    workoutDurationMinimum: {
      type: new GraphQLList(_filterItemType),
      resolve(source) {
        return source.workoutDurationMinimum;
      }
    }
  }
});

exports._itemsList = _itemsList;
exports._filtersList = _filtersList;

