const { User, Thought } = require("../models");

module.exports = {
  // Get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find({});
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get single thought by ID
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId }).select("-__v");
      if (!thought) {
        res.status(404).json({ message: "No Thought found with this ID!" });
      } else {
        res.json(thought);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a thought and update the associated user's thoughts array field
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a thought
  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!updatedThought) {
        res.status(404).json({ message: "No thought found with this ID!" });
      } else {
        res.json(updatedThought);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a thought and remove it from the associated user's thoughts array
  async deleteThought(req, res) {
    try {
      const deletedThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!deletedThought) {
        res.status(404).json({ message: "No thought found with this ID!" });
      } else {
        await User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );

        res.json({ message: "Thought successfully deleted" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a reaction for a thought
  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: "No thought found with this ID!" });
      } else {
        res.json(thought);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a reaction from a thought
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: "No thought found with this ID!" });
      } else {
        res.json(thought);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
