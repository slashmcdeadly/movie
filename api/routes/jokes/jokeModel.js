const mongoose = require('mongoose');
const { Schema } = mongoose;

const jokeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  movie: {
    type: String,
    required: true,
  },
  imdb: {
    type: String,
    required: true,
  },
  dateAdded: {
    type: Date,
    default: Date.now(),
  },
  joke: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Joke', jokeSchema);