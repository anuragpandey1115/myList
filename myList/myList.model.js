const mongoose = require("mongoose");

const myListSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    itemId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Assuming itemId is a reference to the movie or TV show
    itemType: { type: String, enum: ['movie', 'TV show'], required: true },
    createdAt: { type: Date, default: Date.now }
  }, { timestamps: true });
  
  module.exports = mongoose.model('MyList', myListSchema);
  