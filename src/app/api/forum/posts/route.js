import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect"
import ForumPost from "@/models/forumPostModel"
import ForumThread from "@/models/forumThreadModel"

export async function POST(req) {
    await dbConnect();

    try {
        const { thread, author, content, parentPost } =  await req.json();
        const newPost = new ForumPost({ thread, author, content, parentPost });
        
        await newPost.save();
        
        await ForumThread.findByIdAndUpdate(thread, {$inc:{postCount:1}})
        
        return NextResponse.json(newPost,{status:201});
      } catch (error) {
        return NextResponse.json({  error: error.message },{status:400});
      }
}