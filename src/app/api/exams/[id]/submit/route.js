import Submission from "@/models/submissionModel"; 
import Exam from "@/models/examModel";
import Question from "@/models/questionModel"; 
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect"
import {getSession} from "next-auth/react"

export async function POST(req) {

  
    // const session = await getSession({ req });

    // if (!session) {
    //     return res.status(401).json({ error: 'Unauthorized' });
    //   }

  await dbConnect();
  
  try {
    
    const { studentId,  answers,examId, timeSpent } = await req.json();

    // Fetch the exam and its questions
    const exam = await Exam.findById(examId).populate('questions');
    
    if (!exam) {
      return NextResponse.json({ error: 'Exam not found' }, { status: 404 });
    }

    let score = 0;
console.log(answers)
    // Calculate the score by comparing student's answers with correct answers
    const evaluatedAnswers = answers.map((answer,ind) => {
        console.log(answer)
      const question = exam.questions.find(q => q._id.toString() === answer.question);
     
      const correctOptionIndex = question.options.findIndex(opt => opt.isCorrect);
      
      // Award points if selected option is correct
      if (answer.selectedOption === correctOptionIndex) {
        score += question.marks;
      }
      
      return {
        question: answer.question,
        selectedOption: answer.selectedOption,
      };
    });

    // Create and save the submission
    const newSubmission = new Submission({
      student: studentId,
      exam: examId,
      answers: evaluatedAnswers,
      timeSpent,
      score,
      isCompleted: true,
      submittedAt: new Date(),
    });

    await newSubmission.save();

    return NextResponse.json(newSubmission, { status: 201 });

  } catch (error) {
    console.error("Error submitting exam:", error);
    return NextResponse.json({ error: 'Error submitting exam' }, { status: 500 });
  }
}