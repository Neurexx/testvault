import mongoose from "mongoose";


const ForumThreadSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Thread title
    category: { type: mongoose.Schema.Types.ObjectId, ref: "ForumCategory", required: true }, // Reference to the category
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user who created the thread
    content: { type: String, required: true }, // Initial content of the thread
    views: { type: Number, default: 0 }, // Number of views
   
  },{timestamps:true});
  
  const ForumThread = mongoose.models.ForumThread || mongoose.model("ForumThread", ForumThreadSchema);
  
  export default ForumThread