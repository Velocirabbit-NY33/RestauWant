const Restaurant = require('../models/restaurantModel');
const fetch = require('node-fetch');
const restaurantController = {};



restaurantController.searchApi = (req, res, next) => {
  console.log('Entered the searchApi method within restaurantController');
  // console.log('req.query.term ', req.query.term);
  // console.log('req.query.latitude', req.query.latitude);
  // console.log('req.query.longitude', req.query.longitude);
  // react --> http;//localhost:8080/api/restuarants/OUrParameters
  // here: inserting the params into yelp API: api.yelo.com/ourparameter
  const arr = [];
  // getting parameters from GET request
  const params = req.query;
  for (const key in params) {
    arr.push(`${key}=${params[key]}`);
  }

  const searchTerms = arr.join('&');

  const url = `https://api.yelp.com/v3/businesses/search?${searchTerms}`;

  console.log(req.query);
  console.log('url ', url);
  //Query the yelp API using a fetch request
  fetch(url, {
    headers: {
      Authorization:
        'Bearer FFhJs96QD1eSN8ptuyp9XrdevQvOjAWTZNR0Dt9DJyIOSzN4jKHKS-iGUZgEhGz1TEcILovZ-bTlQ3HZe0RCJBc8eLni1uFlUQapPMpLQFqrF1hsl4qDPc8dnKyWYnYx',
    },
  })
    // Parse the returned data into a JS object
    .then((rawData) => rawData.json())
    .then((data) => {
      console.log('Received data back from the Yelp API');
      res.locals.yelpResults = data.businesses;
      //Iterate over the business property on the object and push the first 5 results into res.locals
      return next();
    });
};

//TO WHOMEVER IT MAY CONCERN (MEANING ITERATION GROUP), YOU PROBABLY WANT TO ADD TRY CATCH BLOCKS HERE
//Asynchronous put request to the database which returns the new Restaurant document
restaurantController.createRestaurant = async (req, res, next) => {
  const newRestaurant = await Restaurant.create(req.body);
  console.log('newRestaurant ', newRestaurant);
  res.locals.newRestaurant = newRestaurant;
  return next();
};

//Asynchronous get request to the database which returns all Restaurant documents
restaurantController.getAllRestaurants = async (req, res, next) => {
  const allRetrievedRestaurants = await Restaurant.find({});
  console.log('allRetrievedRestaurant ', allRetrievedRestaurants);
  res.locals.allRetrievedRestaurants = allRetrievedRestaurants;
  return next();
};

//Asynchronous get request to the database which returns a Restaurant document based on name
restaurantController.getRestaurant = async (req, res, next) => {
  const retrievedRestaurant = await Restaurant.findOne({
    name: req.params.name,
  });
  console.log('retrievedRestaurant ', retrievedRestaurant);
  res.locals.retrievedRestaurant = retrievedRestaurant;
  return next();
};

//Asynchronous patch request to the database which updates and returns a Restaurant document based on name
restaurantController.updateRestaurant = async (req, res, next) => {
  const updatedRestaurant = await Restaurant.findOneAndUpdate(
    { name: req.params.name },
    req.body
  );
  console.log('updatedRestaurant ', updatedRestaurant);
  res.locals.updatedRestaurant = updatedRestaurant;
  return next();
};

//Asynchronous delete request to the database which deletes a Restaurant document based on name
restaurantController.deleteRestaurant = async (req, res, next) => {
  const deletedRestaurant = await Restaurant.deleteOne({
    name: req.params.name,
  });
  // console.log('deletedRestaurant ', deletedRestaurant)
  const { acknowledged, deletedCount } = deletedRestaurant;
  if (acknowledged === true && deletedCount === 1) {
    return next();
  }
  return next({
    log: 'Express error handler caught error in RestaurantController.deleteRestaurant',
    status: 500,
    message: { err: 'Failed to delete Restaurant' },
  });
};

module.exports = restaurantController;
