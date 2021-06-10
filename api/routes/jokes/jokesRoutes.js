const express = require('express')
const { getJokesByUser, createJoke, getJokeById, updateJokeById } = require('./jokesController');
const { verifyToken } = require('../../middleware/verifyToken');

const router = express.Router();
router.use(verifyToken);
router.route('/')
  .get(async (req, res) => {
    const { user } = req;
    try {
      const jokes = await getJokesByUser(user.id);
      res.json({ data: jokes });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'internal server error' });
    }
  })
  .post(async (req, res) => {
    try {
      const { body } = req;
      if (!body.joke || body.joke === '') {
       return res.status(400).json({ message: 'text must be provided' });
      }

      const newJoke = {
        user: req.user.id,
        movie: body.movie,
        imdb: body.imdb,
        joke: body.joke,
        dateAdded: body.dateAdded
      }
      const id = await createJoke(newJoke)
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
      const joke = await getJokeById(params.id);
      res.json({ data: joke });
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

      const newJoke = await updateJokeById({
        user: req.user.id,
        movie: body.movie,
        imdb: body.imdb,
        joke: body.joke,
        dateAdded: body.dateAdded
      });

      res.json({ data: newJoke });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'internal server error' });
    }
  });

module.exports = router;