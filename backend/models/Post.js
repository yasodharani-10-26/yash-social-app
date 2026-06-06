const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  username: {
    type: String,
    required: true
  },

  text: {
    type: String,
    default: ""
  },
image: {
  type: String,
  default: ""
},

  likes: [
    {
      type: String
    }
  ],

  comments: [
    {
      username: String,
      comment: String
    }
  ]

}, {
  timestamps: true
});

module.exports = mongoose.model("Post", PostSchema);