const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const answerSchema = new Schema({
  id_user: {type: Schema.ObjectId, ref: 'user'},
  id_question: {type: Schema.ObjectId, ref: 'question'},
  content: {type: String, required: true},
  vote_up: [{type: Schema.ObjectId, ref: 'user'}],
  vote_down: [{type: Schema.ObjectId, ref: 'user'}]
})

var Answer = mongoose.model('answer', answerSchema);

module.exports = Answer
