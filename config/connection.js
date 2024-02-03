const { connect, connection } = require('mongoose');

//wrap local collection to mongodb
connect('mongodb://127.0.0.1:27017/videosAndResponses');

//export it
module.exports = connection;