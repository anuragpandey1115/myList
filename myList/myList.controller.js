const MyListModel = require('./myList.model');
const User = require('../user.model');
const Movie = require('../movie.model');

// Add to My List Controller
exports.addToMyList = async (req, res) => {
  try {
    const { userId, itemId, itemType } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the item exists (assuming itemType is 'movie' for this example)
    const movie = await Movie.findById(itemId);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    // Check if the item already exists in the user's list
    const existingItem = await MyListModel.findOne({ userId, itemId });

    if (existingItem) {
      return res.status(400).json({ error: 'Item already exists in the list' });
    }

    // Create a new item in the user's list
    const newItem = new MyListModel({ userId, itemId, itemType });
    await newItem.save();

    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error adding item to My List:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Remove from My List Controller
exports.removeFromMyList = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    // Find and remove the item from the user's list
    const result = await MyListModel.findOneAndRemove({ userId, itemId });

    if (!result) {
      return res.status(404).json({ error: 'Item not found in the user\'s list' });
    }

    res.status(200).json({ message: 'Item removed from My List successfully' });
  } catch (error) {
    console.error('Error removing item from My List:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// List My Items Controller
exports.listMyItems = async (req, res) => {
  try {
    const { userId } = req.query;
    const items = await MyListModel.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json(items);
  } catch (error) {
    console.error('Error listing items from My List:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
