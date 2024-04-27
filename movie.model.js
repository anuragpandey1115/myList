const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genres: [{ type: String }],
  releaseDate: { type: Date, required: true },
  director: { type: String, required: true },
  actors: [{ type: String }]
});

const MovieModel = mongoose.model('Movie', movieSchema);

module.exports = MovieModel;
