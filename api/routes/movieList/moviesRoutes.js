const express = require('express')
const { getMoviesByUser, createMovie, getMovieById, updateMovieById } = require('./moviesController');
const { verifyToken } = require('../../middleware/verifyToken');

const router = express.Router();
router.use(verifyToken);
router.route('/')
  .get(async (req, res) => {
    const { user } = req;
    try {
      const movies = await getMoviesByUser(user.id);
      res.json({ data: movies });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'internal server error' });
    }
  })
  .post(async (req, res) => {
    try {
      const { body } = req;
      if (!body.movie || body.movie === '') {
       return res.status(400).json({ message: 'text must be provided' });
      }

      const newMovie = {
        user: req.user.id,
        movie: body.movie,
        year: body.year,
        imdb: body.imdb,
        poster: body.poster,
        dateAdded: body.dateAdded
      }
      const id = await createMovie(newMovie)
      res.json({ data: { id }});
    } catch(err) {
      console.log(err);
      res.status(500).json({ message: 'internal server error' });
    }

  });

router.route('/:id')
  .get(async (req, res) => {
    try {
      const { params } = req;
      const movie = await getMovieById(params.id);
      res.json({ data: movie });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'internal server error' });
    }
  })
  .put(async (req, res) => {
    try {
      const { body, params, user } = req;
      if (!body.movie || body.movie === '') {
        return res.status(400).json({ message: 'no stock added' });
      }

      const newMovie = await updateMovieById({
        user: req.user.id,
        movie: body.movie,
        year: body.year,
        imdb: body.imdb,
        poster: body.poster,
        dateAdded: body.dateAdded
      });

      res.json({ data: newMovie });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'internal server error' });
    }
  });

module.exports = router;