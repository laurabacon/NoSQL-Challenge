const router = require('express').Router();
const { 
  getThoughts,
  getASingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require("../../controllers/thoughtController");

// Gets and posts all thoughts
// http://localhost:3001/api/thoughts
router.route("/")
  .get(getThoughts)
  .post(createThought);

// Gets a single thought by id, updates, and deletes
// http://localhost:3001/api/thoughts/:thoughtId
router.route("/:thoughtId")
  .get(getASingleThought)
  .put(updateThought)
  .delete(deleteThought);

// Creates a new thought
// http://localhost:3001/api/thoughts/:userId
router.route("/:userId")
  .post(createThought);

// Creates a reaction on a thought
// http://localhost:3001/api/thoughts/:thoughtId/reactions
//http://localhost:3001/api/thoughts/65bee4bcf5f294a5dd937a3f/reactions
router.route("/:thoughtId/reactions")
  .post(createReaction);

// Updates and deletes a reaction on a thought
// http://localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId
//http://localhost:3001/api/thoughts/65bee4bcf5f294a5dd937a3f/reactions/
router.route("/:thoughtId/reactions/:reactionId").post(createReaction)
  .delete(deleteReaction);

module.exports = router;