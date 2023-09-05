const express = require('express');
const app = express();
const port = 3200; //

const users = [
    {
        id: 1,
        userName: "Mahmoud",
        email: "mahmoud@gmail.com",
        age: 21
    },
    {
        id: 2,
        userName: "Ahmed",
        email: "Ahmed@gmail.com",
        age: 25
    },
    {
        id: 3,
        userName: "Yousef",
        email: "Yousef@gmail.com",
        age: 38
    }
]
function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const posts = [
    {
        content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam, ipsum.",
        date: randomDate(new Date(2023, 9, 1), new Date(2023, 9, 5))
    },
    {
        content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam, ipsum.",
        date: randomDate(new Date(2023, 9, 1), new Date(2023, 9, 5))
    },
    {
        content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam, ipsum.",
        date: randomDate(new Date(2023, 9, 1), new Date(2023, 9, 5))
    },
    {
        content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam, ipsum.",
        date: randomDate(new Date(2023, 9, 1), new Date(2023, 9, 5))
    }
]

// Get Users
app.get('/users', (req, res) => {
    return res.json(users);
});

// Add user

app.post('/users/adduser', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

// users sorting

app.get('/users/sorted', (req, res) => {
    const sortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name));
    res.json(sortedUsers);
});

// users delete 
app.delete('/users/delete/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// users update

app.put('/users/update/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex !== -1) {
        users[userIndex].name = req.body.name;
        res.json(users[userIndex]);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// users search

app.get('/users/search/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find((user) => user.id === userId);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// get posts
app.get('/posts', (req, res) => {
    res.json(posts);
});

// add a new post
app.post('/addpost', (req, res) => {
    const newPost = {
        id: posts.length + 1, // Assign a unique ID
        title: req.body.title, // Assuming the request body contains a 'title' field
        userId: req.body.userId, // Assuming the request body contains a 'userId' field
    };

    posts.push(newPost);
    res.status(201).json(newPost);
});

// reverse order
app.get('/posts/reversed', (req, res) => {
    const reversedPosts = [...posts].reverse();
    res.json(reversedPosts);
});

// delete a post by ID
app.delete('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = posts.findIndex((post) => post.id === postId);

    if (postIndex !== -1) {
        posts.splice(postIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});

// update a post by ID
app.put('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const updatedPost = req.body;

    const postIndex = posts.findIndex((post) => post.id === postId);

    if (postIndex !== -1) {
        posts[postIndex] = { ...posts[postIndex], ...updatedPost };
        res.json(posts[postIndex]);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});

// search for a post by ID
app.get('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find((post) => post.id === postId);

    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});