const router = require('express').Router();

const {
    getThoughts,
    getASingleThought,
    createThought,
    updateThought,
    deleteThought,
    addAReaction,
    deleteAReaction,
  } = require("../../controllers/userController");

//gets and posts all thoughts 
//http://localhost:3001/api/thoughts
router.route("/").get(getThoughts).post(createThought);

//gets a sungle thought by id puts and deletes
// http://localhost:3001/api/thoughts/:thoughtId
router.route("/:thoughtId").get(getASingleThought).put(updateThought).delete(deleteThought);

//creates a new thought
// http://localhost:3001/api/thoughts/:userId
router.route("/:userId").post(createThought);

//creates a reaction on a thought
// http://localhost:3001/api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addAReaction);

//puts and deletes reaction on a thought
// http://localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(deleteAReaction);

module.exports = router;