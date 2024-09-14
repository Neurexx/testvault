import dbConnect from "@/lib/dbConnect"
import { NextResponse } from "next/server"
import Question from "@/models/questionModel";
import Exam from "@/models/examModel"


export async function POST(req) {
    await dbConnect();

    try {
      const { title, date, duration, totalMarks, description, questions } = await req.json();
    
      // Create questions first
      const questionDocs = await Question.insertMany(questions);

      // Create the exam
      const newExam = new Exam({
        title,
        
        date,
        duration,
        totalMarks,
        description,
        questions: questionDocs.map((q) => q._id), // Add question IDs to exam
      });

      await newExam.save();
      return NextResponse.json(newExam,{status:201});
    } catch (error) {
        console.log(error)
      return NextResponse.json({ error: 'Error creating exam' },{status:500});
    }
    
}



export async function GET(req) {
    const { id } = await req.params;
  
    await dbConnect();
  console.log("hey",id)
    try {
      const exam = await Exam.findById(id).populate('questions');
      if (!exam) {
        return NextResponse.json({ error: 'Exam not found' }, { status: 404 });
      }
      return NextResponse.json(exam, { status: 200 });
    } catch (error) {
        console.log(error)
      return NextResponse.json({ error: 'Error fetching exam' }, { status: 500 });
    }
  }