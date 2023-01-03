const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
} = require("../../controllers/userController");

// /api/users
// GET all users

// GET a single user by its _id and populated thought and friend data

// POST a new user

// PUT to update a user by its _id

// DELETE to remove user by its _id

// /api/users/:userId/friends/:friendId
// POST to add a new friend to a user's friend list

// DELETE to remove a friend from a user's friend list

module.exports = router;
