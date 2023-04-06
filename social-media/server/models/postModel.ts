import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    desc: String,
    likes: [],
    comments: [
      {
        userId: { type: String, required: true },
        comment: String,
      },
    ],
    image: String,
  },
  {
    timestamps: true,
  }
);

var PostModel = mongoose.model("Posts", PostSchema);
export default PostModel;
