const Posts = require('../models/Post');

const createPost = async (req, res) => {
  try {
    const { title, author, date, description, category, image } = req.body;
    const post = new Posts({
      title,
      author,
      date,
      description,
      category,
      image
    });
    await post.save();
    res.status(201).send(post);
    console.log('Received POST request to /api/posts');
  } catch (error) {
    res.status(404).send(error);
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Posts.find();
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getPostById = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Posts.findById(postId);
    res.status(200).send(post);
  } catch (error) {
    res.status(500).send(error);
  }
};

const searchPosts = async (req, res) => {
  const { q = '' } = req.query;

  try {
    const posts = await Posts.find({ $text: { $search: q } });
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updatePostById = async (req, res) => {
  const postId = req.params.id;
  const { title, author, date, description, category, image } = req.body;

  try {
    const updatedPost = await Posts.findByIdAndUpdate(
      postId,
      { title, author, date, description, category, image },
      { new: true, runValidators: true }
    );
    if (!updatedPost) {
      return res.status(404).send({ message: 'Post not found' });
    }
    res.status(200).send(updatedPost);
  } catch (error) {
    res.status(404).send(error);
  }
};

const deletePostById = async (req, res) => {
  const postId = req.params.id;

  try {
    const deletedPost = await Posts.findByIdAndDelete(postId);
    res.status(200).send({ message: 'Post delete success', deletedPost });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  searchPosts,
  updatePostById,
  deletePostById
};