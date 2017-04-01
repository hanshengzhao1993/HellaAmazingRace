var mongoose = require('mongoose');


mongoose.connect('mongodb://mikeliao:root@ds143340.mlab.com:43340/cloud');


mongoose.connection.on('error', function(error) {
  console.error(error);
});

mongoose.connection.once('open', function() {
  console.log('Mongoose connected.');
});

module.exports = mongoose;