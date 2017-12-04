const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const questionSchema = new Schema({
  id_user: [{type: Schema.ObjectId, ref: 'user'}],
  title: {type: String, required: true},
  content: {type: String, required: true},
  imgUrl: {type: String},
  answer: [{type: Schema.ObjectId, ref: 'answer'}],
  vote_up: [{type: Schema.ObjectId, ref: 'user'}],
  vote_down: [{type: Schema.ObjectId, ref: 'user'}],
},
{timestamps:true})

var Questions = mongoose.model('question', questionSchema);

module.exports = Questions
