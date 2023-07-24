const mongoose = require('mongoose');
const User = require('../models/User');
const Thought = require('../models/Thought');
const data = require('./data');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/my_social_network', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing data (optional, use with caution in development)
    await User.deleteMany();
    await Thought.deleteMany();
    console.log('Cleared existing data');

    // Seed users
    const users = await User.insertMany(data.users);
    console.log(`Seeded ${users.length} users`);

    // Seed thoughts
    const thoughts = data.thoughts.map((thoughtData) => {
      const user = users.find((user) => user.username === thoughtData.username);
      thoughtData.username = user._id;
      return thoughtData;
    });
    await Thought.insertMany(thoughts);
    console.log(`Seeded ${thoughts.length} thoughts`);

    // Seed reactions
    const thought = thoughts[0]; // For simplicity, assign the reactions to the first thought
    const reactions = data.reactions.map((reactionData) => {
      const user = users.find((user) => user.username === reactionData.username);
      reactionData.username = user._id;
      return reactionData;
    });
    thought.reactions = reactions;
    await thought.save();
    console.log(`Seeded reactions`);

    // Close the MongoDB connection
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (err) {
    console.error('Error seeding database:', err.message);
    process.exit(1);
  }
};

// Call the seedDatabase function to seed the database
seedDatabase();
