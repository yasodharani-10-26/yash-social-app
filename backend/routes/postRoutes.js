const router = require("express").Router();
const Post = require("../models/Post");

// CREATE POST
router.post("/", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// GET ALL POSTS
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// LIKE POST
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post.likes.includes(req.body.username)) {
      await post.updateOne({
        $push: { likes: req.body.username },
      });
    } else {
      await post.updateOne({
        $pull: { likes: req.body.username },
      });
    }

    res.status(200).json("Post updated");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// COMMENT
router.put("/:id/comment", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    await post.updateOne({
      $push: {
        comments: {
          username: req.body.username,
          comment: req.body.comment,
        },
      },
    });

    res.status(200).json("Comment added");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;