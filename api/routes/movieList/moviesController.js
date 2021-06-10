const Movies = require('./movieModel');

exports.getMoviesByUser = async (userID) => {
  try {
    const movies = await Movies
      .find({ user: userID })
      .populate({ path: 'user', select: 'firstName lastName' });
    return movies;
  } catch (err) {
    throw err;
  }
};

exports.createMovie = async (data) => {
  try {
    const newMovie = new Movies(data);
    const movie = await newMovie.save();
    return movie.id;
  } catch (err) {
    throw err;
  }
};

exports.getMovieById = async (id) => {
  try {
    const movie = await Movies
      .findById(id)
      .populate({ path: 'user', select: 'firstName lastName' });
    return movie;
  } catch(err) {
    throw err;
  }
};

exports.updateMovieById = async (movie) => {
  try {
    const m = await Movies.findOne({
      user: movie.user,
      _id: movie.id,
    });
    m.movie = movie.movie;
    const savedMovie = await m.save();
    return savedMovie;
  } catch (err) {
    throw err;
  }
}