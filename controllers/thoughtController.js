const { User, Thought } = require("../models");

module.exports = {
  //get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //get a single user
  async getASingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId }).select(
        "-__v"
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "We could not find a thought with this id" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
      console.log("Thinking...Thought Created!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //update a user
  async updateThought(req, res) {
    try {
      const updateThought = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        req.body
      );
      if (!updateThought) {
        return res
          .status(404)
          .json({ message: "We could not find a thought with this id" });
      }
      res.json(updateThought);
    } catch (err) {
      res.json(err);
    }
  },
  //delete a thought
  async deleteThought(req, res) {
    try {
      const destroy = await Thought.findOneAndDelete({ _id: req.params.id });

      if (!destroy) {
        return res
          .status(404)
          .json({ message: "We could not delete, no thought found" });
      }
      res.json({ message: "Thought was deleted" });
    } catch (err) {
      res.json(err);
    }
  },
  //add a reaction to a thought
  createReaction({ params, body }, res) {
    try {
      Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { reactions: body } },
        { new: true, runValidators: true }
      )
        .populate({ path: "reactions", select: "-__v" })
        .select("-__v")
        .then((dbThoughtData) => {
          if (!dbThoughtData) {
            res.status(404).json({ message: "No thoughts with this ID." });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch((err) => res.status(400).json(err));
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //delete a reaction from a thought
  deleteReaction({ params }, res) {
    try {
      Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { new: true }
      )
        .then((dbThoughtData) => {
          if (!dbThoughtData) {
            res.status(404).json({ message: "Nope!" });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch((err) => res.json(err));
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
