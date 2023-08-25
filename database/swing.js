var mongoose = require('mongoose');

var mongoDB = 'mongodb://127.0.0.1:27017/swing';

//mongoose.Promise = global.Promise;

mongoose.connect(mongoDB);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));