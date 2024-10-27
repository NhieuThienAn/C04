const express = require('express');
const mongoose = require('mongoose');
const { createPost, getAllPosts, getPostById, updatePostById, deletePostById, searchPosts } = require('./Controllers/PostController');
const { register, login, getUserById, updateUserById } = require('./Controllers/UserController');
const getAllInformations = require('./Controllers/InformationController');
const app = express();
const PORT = 3000;

mongoose.connect('mongodb+srv://thienan:L8PjtDPlT5BJCcae@cluster0.lgciq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

//posts
app.get('/api/posts', getAllPosts); //dc
app.get('/api/posts/search', searchPosts); //dc
app.get('/api/posts/:id', getPostById); //dc
app.post('/api/posts', createPost); //dc
app.put('/api/posts/:id', updatePostById); //dc
app.delete('/api/posts/:id', deletePostById); //dc


// accounts
app.post('/api/register', register);//dc
app.post('/api/login', login); //dc
app.get('/api/users/:id', getUserById); //dc
app.put('/api/users/:id', updateUserById); //dc

//celebrity information
app.get('/api/information', getAllInformations.getAllInformations); //dc

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});