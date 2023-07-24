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
      useCreateIndex: true,
      useFindAndModify: false,
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
    data.thoughts.forEach((thoughtData) => {
      const user = users.find((user) => user.username === thoughtData.username);
      thoughtData.username = user._id;
    });
    const thoughts = await Thought.insertMany(data.thoughts);
    console.log(`Seeded ${thoughts.length} thoughts`);

    // Seed reactions
    data.reactions.forEach(async (reactionData) => {
      const thought = thoughts[0]; // For simplicity, assign the reaction to the first thought
      reactionData.username = users.find(
        (user) => user.username === reactionData.username
      )._id;
      thought.reactions.push(reactionData);
      await thought.save();
    });
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
