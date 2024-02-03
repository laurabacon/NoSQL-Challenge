const router = require("express").Router();

const {
  getUsers,
  getASingleUser,
  createUser,
  updateUser,
  deleteUser,
  addAFriend,
  deleteAFriend,
} = require("../../controllers/userController");

// http://localhost:3001/api/users
router.route("/").get(getUsers).post(createUser);

// http://localhost:3001/api/users/:userId
router.route("/:userId").get(getASingleUser).put(updateUser).delete(deleteUser);

// http://localhost:3001/api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addAFriend).delete(deleteAFriend);

module.exports = router;




