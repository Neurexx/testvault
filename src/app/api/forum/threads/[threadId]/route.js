import { NextResponse } from "next/server";
import dbConnect from '@/lib/dbConnect';
import ForumThread from "@/models/forumThreadModel";


export async function GET(req,{params}){
    const { threadId } = params;

  await dbConnect();

  try {
    const thread = await ForumThread.findById(threadId).populate('author','_id name');
    if (!thread) {
        return NextResponse.json({ error: 'Thread not found' });
    }
    return NextResponse.json(thread,{status:200});
  } catch (error) {
    return NextResponse.json({  error: error.message });
  }
}