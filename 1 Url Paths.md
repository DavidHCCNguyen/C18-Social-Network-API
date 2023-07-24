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