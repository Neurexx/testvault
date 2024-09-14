import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Exam from '@/models/examModel';
import Question from "@/models/questionModel"
export async function GET(req, { params }) {
  const { id } = params;

  await dbConnect();

  try {
    const exam = await Exam.findById(id).populate('questions');
    if (!exam) {
      return NextResponse.json({ error: 'Exam not found' }, { status: 404 });
    }
    return NextResponse.json(exam, { status: 200 });
  } catch (error) {
    
    return NextResponse.json({ error: 'Error fetching exam' }, { status: 500 });
  }
}
