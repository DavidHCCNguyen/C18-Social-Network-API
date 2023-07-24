# Url Paths
```
/api/users (GET) - Get all users

/api/users (POST) - Create a new user

/api/users/:id (GET) - Get a single user by its _id and populated thought and friend data

/api/users/:id (PUT) - Update a user by its _id

/api/users/:id (DELETE) - Remove user by its _id

/api/users/:userId/friends/:friendId (POST) - Add a new friend to a user's friend list

/api/users/:userId/friends/:friendId (DELETE) - Remove a friend from a user's friend list

/api/thoughts (GET) - Get all thoughts

/api/thoughts (POST) - Create a new thought

/api/thoughts/:thoughtId (GET) - Get a single thought by its _id

/api/thoughts/:thoughtId (PUT) - Update a thought by its _id

/api/thoughts/:thoughtId (DELETE) - Remove a thought by its _id

/api/thoughts/:thoughtId/reactions (POST) - Create a reaction stored in a single thought's reactions array field

/api/thoughts/:thoughtId/reactions/:reactionId (DELETE) - Pull and remove a reaction by the reaction's reactionId value
```

# Meanings of Folders and Js

```
models/User.js - Define the User model using Mongoose schema.

models/Thought.js - Define the Thought model using Mongoose schema and the Reaction subdocument schema.

routes/userRoutes.js - Implement the API routes for handling users, including GET, POST, PUT, and DELETE operations.

routes/thoughtRoutes.js - Implement the API routes for handling thoughts and reactions, including GET, POST, PUT, and DELETE operations.

controllers/userController.js - Implement the controller functions for user-related operations.

controllers/thoughtController.js - Implement the controller functions for thought-related operations.

utils/date.js - Create utility functions for handling timestamps and date formatting (optional).
```