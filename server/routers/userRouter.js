const express = require('express');
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');
const router = express.Router();



// Create a user in the database
// http://localhost:8080/user/
router.post('/create', userController.createUser, (req, res) => {
  console.log('inside createUser');
  return res.status(200).send(res.locals.newUser);
});

// Get all users from the database
// http://localhost:8080/user/
router.get('/', userController.getAllUsers, (req, res) => {
  return res.status(200).send(res.locals.allRetrievedUsers);
});

// Verify a specific user from the database
// http://localhost:8080/user/login
//  sessionController.startSession, cookieController.setSSIDCookie, 
router.post('/login', userController.verifyUser, sessionController.startSession, cookieController.setSSIDCookie, (req, res) => {
  return res.status(200).json({verified: true, fullName: res.locals.user.name || res.locals.user.userName});
});

// Get a specific user from the database
// http://localhost:8080/user/"name"
router.get('/:name', userController.getUser, (req, res) => {
  return res.status(200).send(res.locals.retrievedUser);
});


// Change a user's info
// http://localhost:8080/user/"name"
router.patch('/:name', userController.updateUser, (req, res) => {
  return res.status(200).send(res.locals.updatedUser);
});

// Delete a user from the database
// http://localhost:8080/user/"name"
router.delete('/:name', userController.deleteUser, (req, res) => {
  return res.status(200).send(JSON.stringify({message: 'This user is now dead bro'}));
});

module.exports = router;