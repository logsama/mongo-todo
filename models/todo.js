

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema  = new Schema({
  name: String
});

mongoose.model('employees', TodoSchema);

