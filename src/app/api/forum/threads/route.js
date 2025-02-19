import ForumThread from "@/models/forumThreadModel";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect"


export async function POST(req) {
    await dbConnect();

    try {
        const { title, category, author, content } =  await req.json();
        
        const newThread = new ForumThread({ title, category, author, content });
        await newThread.save();
        return NextResponse.json(newThread,{status:201});
      } catch (error) {
        return NextResponse.json({  error: error.message },{status:400});
      }
}

export async function GET(req) {
    await dbConnect()

    try {
        
        const query = new URLSearchParams(req.nextUrl.search);
      const page = parseInt(query.get("page"));
      const limit = 5; 
      const skip = (page - 1) * limit;

      const threads = await ForumThread.find()
          .populate('author')
          .skip(skip)
          .limit(limit)
          .sort({ createdAt: -1 });
          
          return NextResponse.json(threads,{status:200});
      } catch (error) {
        return NextResponse.json({ error: error.message },{status:400});
      }
    
}