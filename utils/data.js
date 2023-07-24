const data = {
  users: [
    {
      username: 'lernantino',
      email: 'lernantino@gmail.com',
      thoughts: [],
      friends: [],
    },
    {
      username: 'David',
      email: 'DavidNguyen@gmail.com',
      thoughts: [],
      friends: [],
    },
    // Add more user data as needed
  ],
  thoughts: [
    {
      thoughtText: "Here's a cool thought...",
      username: 'lernantino',
      reactions: [],
    },
    // Add more thought data as needed
  ],
  reactions: [
    {
      reactionBody: 'I agree!',
      username: 'David',
    },
    // Add more reaction data as needed
  ],
};

module.exports = data;
