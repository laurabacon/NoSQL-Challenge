const { connect, connection } = require('mongoose');
const { User, Thought } = require("../models");

connect('mongodb://127.0.0.1:27017/videosAndResponses');

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  let userCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (userCheck.length) {
    await connection.db.dropCollection("users");
  }

  let thoughtCheck = await connection.db
    .listCollections({ name: "thoughts" })
    .toArray();
  if (thoughtCheck.length) {
    await connection.db.dropCollection("thoughts");
  }

  const users = [
    {
      username: "firstUser",
      email: "firstUser@aol.com",
    },
    {
        username: "secondUser",
        email: "secondUser@aol.com",
    },
    {
        username: "thirdUser",
        email: "thirdUser@aol.com",
    },
    {
        username: "fourthUser",
        email: "fourthUser@aol.com",
    },
    {
        username: "fifthUser",
        email: "fifthUser@aol.com",
    }];

  const thoughts = [
    {
        thoughtText: "This is my First Thought",
        reactionBody: "First Reaction",
        username: "firstUser",
      },
      {
        thoughtText: "This is my Second thought",
        reactionBody: "Sixth Reaction",
        username: "firstUser",
      },
      {
        thoughtText: "Third thought",
        reactionBody: "Third Reaction",
        username: "secondUser",
      },
      {
        thoughtText: "Fourth thought",
        reactionBody: "Fourth Reaction",
        username: "thirdUser",
      },
      {
        thoughtText: "Fifth thought",
        reactionBody: "Fifth Reaction",
        username: "fourthUser",
      },
      {
        thoughtText: "Sixth thought",
        reactionBody: "Sixth Reaction",
        username: "fifthUser",
      },];

    try {
        const createdUsers = await User.insertMany(users);
        const createdThoughts = await Thought.insertMany(thoughts);
    
        console.log("Created User:");
        console.table(createdUsers);
        console.log("Thinking...Thoughts created:");
        console.table(createdThoughts);
        console.info("Seeded Datd");
      } catch (error) {
        console.error("Error seeding data:", error);
      } finally {
        process.exit(0);
      }
    });