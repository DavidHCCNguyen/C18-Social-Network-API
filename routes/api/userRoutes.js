const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Thought = require('../models/Thought');

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get users.' });
  }
});

// GET a single user by its _id and populated thought and friend data
router.get('/:id', async (req, res) => {
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
});

// POST a new user
router.post('/', async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.create({ username, email });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create a new user.' });
  }
});

// PUT to update a user by its _id
router.put('/:id', async (req, res) => {
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
});

// DELETE to remove user by its _id
router.delete('/:id', async (req, res) => {
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
});

// POST to add a new friend to a user's friend list
router.post('/:userId/friends/:friendId', async (req, res) => {
  try {
    const { userId, friendId } = req.params;

    // Check if both user and friend exist
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ error: 'User or friend not found.' });
    }

    // Check if the friend is not already in the user's friends list
    if (!user.friends.includes(friendId)) {
      user.friends.push(friendId);
      await user.save();
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add a friend.' });
  }
});

// DELETE to remove a friend from a user's friend list
router.delete('/:userId/friends/:friendId', async (req, res) => {
  try {
    const { userId, friendId } = req.params;

    // Check if both user and friend exist
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ error: 'User or friend not found.' });
    }

    // Check if the friend is in the user's friends list
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter(
        (friend) => friend.toString() !== friendId
      );
      await user.save();
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove a friend.' });
  }
});

module.exports = router;
