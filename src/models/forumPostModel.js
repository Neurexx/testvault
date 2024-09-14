import mongoose from "mongoose";

const ForumPostSchema = new mongoose.Schema({
    thread: { type: mongoose.Schema.Types.ObjectId, ref: "ForumThread", required: true }, // Reference to the thread
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // The user who created the post
    content: { type: String, required: true }, // Post content
    parentPost: { type: mongoose.Schema.Types.ObjectId, ref: "ForumPost" }, // Optional reference if this is a reply to another post
    
  },{timestamps:true});
  
  const ForumPost = mongoose.models.ForumPost || mongoose.model("ForumPost", ForumPostSchema);

  export default ForumPost