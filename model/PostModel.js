const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    tags: {
      type: String,
    },
    image: {
      type: String,
    },
    cloudinary_id: {
      type: String,
    },
    created_by: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
