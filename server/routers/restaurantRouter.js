const express = require('express');
const restaurantController = require('../controllers/restaurantController');
const router = express.Router();

// Get an array of restaurants from the API
// GET request to: http://localhost:8080/api/restaurant/search?latitude=37.786882&longitude=-122.399972
// or to: http://localhost:8080/api/restaurant/search?location=94111
router.get('/search', restaurantController.searchApi, (req, res) => {
  return res.send(res.locals.yelpResults);
});

module.exports = router;