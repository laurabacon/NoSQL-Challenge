const { User, Thought } = require("../models");

module.exports = {
//get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
//get a sungle user
  async getASingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );

      if (!user) {
        return res.status(404).json({ message: "We could not find a user with this id" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
//update a user
  async updateUser(req, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
      );

      if (!dbUserData) {
        return res.status(404).json({ message: "We could not find a user with this id" });
      }

      res.json(dbUserData);
    } catch (err) {
      res.json(err);
    }
  },
//delete a user
  async deleteUser(req, res) {
    try {
      const dbUserData = await User.findOneAndDelete({ _id: req.params.id });

      if (!dbUserData) {
        return res.status(404).json({ message: "We could not find a user with this id" });
      }
      res.json({ message: "User deleted!" });
    } catch (err) {
      res.json(err);
    }
  },
//add a friend
  async addAFriend(req, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true, runValidators: true }
      );

      if (!dbUserData) {
        return res.status(404).json({ message: "We could not find a user with this id" });
      }

      res.json(dbUserData);
    } catch (err) {
      res.json(err);
    }
  },
//delete a friend
  async deleteAFriend(req, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!dbUserData) {
        return res.status(404).json({ message: "We could not find a user with this id" });
      }

      res.json(dbUserData);
    } catch (err) {
      res.json(err);
    }
  },
};
