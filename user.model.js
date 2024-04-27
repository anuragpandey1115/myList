const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  preferences: {
    favoriteGenres: [{ type: String }],
    dislikedGenres: [{ type: String }]
  },
  watchHistory: [{
    contentId: { type: mongoose.Schema.Types.ObjectId, required: true },
    watchedOn: { type: Date, default: Date.now },
    rating: { type: Number }
  }]
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
