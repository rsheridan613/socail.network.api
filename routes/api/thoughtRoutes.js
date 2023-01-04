const router = require("express").Router();
const {
  getThoughts,
  getOneThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

// /api/thoughts
router.route("/").get(getThoughts).put(createThought);

// /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getOneThought)
  .post(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router
  .route("/:thoughtId/reactions")
  .post(createReaction)
  .delete(deleteReaction);

module.exports = router;
