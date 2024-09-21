import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect"
import ForumPost from "@/models/forumPostModel"
import ForumThread from "@/models/forumThreadModel"


export async function GET(req,{params}){
    const { threadId } = params;

    await dbConnect();
    try {
        const posts = await ForumPost.find({ thread: threadId }).populate('author','_id name').populate('parentPost');
        return NextResponse.json(posts);
      } catch (error) {
        return NextResponse.json({ error: error.message });
      }

}