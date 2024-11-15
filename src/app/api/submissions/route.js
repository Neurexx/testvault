import dbConnect from "@/lib/dbConnect";
import Submission from "@/models/submissionModel"
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        await dbConnect()
        const {userId}=await req.json()
       console.log(userId)
        const submissions = await Submission.find({ student: userId })
        .populate('exam', 'title')
      .sort({ submittedAt: -1 }) // Sort by submission date, most recent first
      .lean();
      console.log(submissions)
      return NextResponse.json(submissions,{status:200});
    } catch (error) {
        
    }
    
    


}