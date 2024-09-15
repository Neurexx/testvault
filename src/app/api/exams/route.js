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
    
  
    await dbConnect();
    try {
        const exams = await Exam.find().sort({createdAt:'desc'}).populate('questions'); // Populate with question data
        return NextResponse.json(exams);
      } catch (error) {
        return res.status(500).json({ error: 'Error fetching exams' });
      }
    
  }