const User = require('../models/User');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get users.' });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
        .populate('thoughts')
        .populate('friends');

      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get the user.' });
    }
  },

  createUser: async (req, res) => {
    try {
      const { username, email } = req.body;
      const user = await User.create({ username, email });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create a new user.' });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { username, email } = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { username, email },
        { new: true }
      );
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update the user.' });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndRemove(req.params.id);

      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found.' });
      }

      // Remove the user's associated thoughts
      await Thought.deleteMany({ username: deletedUser.username });

      res.json(deletedUser);
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete the user.' });
    }
  },
};

module.exports = userController;
