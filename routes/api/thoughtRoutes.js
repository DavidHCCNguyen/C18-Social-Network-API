const express = require('express');
const router = express.Router();
const Thought = require('../models/Thought');
const User = require('../models/User');

// GET to get all thoughts
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get thoughts.' });
  }
});

// GET to get a single thought by its _id
router.get('/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);

    if (!thought) {
      return res.status(404).json({ error: 'Thought not found.' });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get the thought.' });
  }
});

// POST to create a new thought
router.post('/', async (req, res) => {
  try {
    const { thoughtText, username, userId } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const thought = await Thought.create({ thoughtText, username });

    // Push the created thought's _id to the associated user's thoughts array field
    user.thoughts.push(thought._id);
    await user.save();

    res.json(thought);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create a new thought.' });
  }
});

// PUT to update a thought by its _id
router.put('/:thoughtId', async (req, res) => {
  try {
    const { thoughtText } = req.body;
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { thoughtText },
      { new: true }
    );
    res.json(updatedThought);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update the thought.' });
  }
});

// DELETE to remove a thought by its _id
router.delete('/:thoughtId', async (req, res) => {
  try {
    const deletedThought = await Thought.findByIdAndRemove(req.params.thoughtId);

    if (!deletedThought) {
      return res.status(404).json({ error: 'Thought not found.' });
    }

    res.json(deletedThought);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete the thought.' });
  }
});

// POST to create a reaction stored in a single thought's reactions array field
router.post('/:thoughtId/reactions', async (req, res) => {
  try {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;

    const thought = await Thought.findById(thoughtId);

    if (!thought) {
      return res.status(404).json({ error: 'Thought not found.' });
    }

    thought.reactions.push({ reactionBody, username });
    await thought.save();

    res.json(thought);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create a reaction.' });
  }
});

// DELETE to pull and remove a reaction by the reaction's reactionId value
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const { thoughtId, reactionId } = req.params;

    const thought = await Thought.findById(thoughtId);

    if (!thought) {
      return res.status(404).json({ error: 'Thought not found.' });
    }

    thought.reactions = thought.reactions.filter(
      (reaction) => reaction.reactionId.toString() !== reactionId
    );
    await thought.save();

    res.json(thought);
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove a reaction.' });
  }
});

module.exports = router;
