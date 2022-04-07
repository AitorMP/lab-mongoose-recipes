const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then((recipes) => {
    // Run your code here, after you have insured that the connection was made
    console.log('All existing recipes removed', recipes);
    //Iteration 2

    return Recipe.create([
      {
        title: 'Mousaka',
        level: 'Amateur Chef',
        ingredients: [
          'Aubergine',
          'Courgette',
          'lentils',
          'tomato',
          'onions',
          'etc'
        ],
        cuisine: 'Greek',
        dishType: ['main_course'],
        duration: 120,
        creator: 'Aitor'
      }
    ]);
  })
  .then((recipes) => {
    console.log('Recipe added', recipes);

    //Iteration 3
    return Recipe.insertMany(data, function (error, data) {
      if (error != null) {
        console.log(error);
      } else {
        console.log(data);
        // console.log(data.ops);
      }
    });
  })
  .then((recipes) => {
    console.log('Inserted many recipes from database', recipes);

    //Iteration 4
    return Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 },
      { new: true }
    );
  })
  .then((recipes) => {
    console.log('Receipe Updated', recipes);

    //Iteration 5
    return Recipe.deleteOne({
      title: 'Carrot Cake'
    });
  })
  .then((recipes) => {
    console.log('Carrot Cake is no longer avaliable', recipes);

    //Iteration 6
    return mongoose.disconnect();
  })
  .then(() => {
    console.log('Was disconnected from MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
