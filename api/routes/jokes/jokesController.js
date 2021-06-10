const Jokes = require('./jokeModel');

exports.getJokesByUser = async (userID) => {
  try {
    const jokes = await Jokes
      .find({ user: userID })
      .populate({ path: 'user', select: 'firstName lastName' });
    return jokes;
  } catch (err) {
    throw err;
  }
};

exports.createJoke = async (data) => {
  try {
    const newJoke = new Jokes(data);
    const joke = await newJoke.save();
    return joke.id;
  } catch (err) {
    throw err;
  }
};

exports.getJokeById = async (id) => {
  try {
    const joke = await Jokes
      .findById(id)
      .populate({ path: 'user', select: 'firstName lastName' });
    return joke;
  } catch(err) {
    throw err;
  }
};

exports.updateJokeById = async (joke) => {
  try {
    const j = await Jokes.findOne({
      user: joke.user,
      _id: joke.id,
    });
    j.movie = joke.joke;
    const savedJoke = await j.save();
    return savedJoke;
  } catch (err) {
    throw err;
  }
}