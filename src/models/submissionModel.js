import mongoose from "mongoose";

const submissionSchema=new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the student
    exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true }, // Reference to the exam
    answers: [{
      question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true }, // Reference to the question
      selectedOption: { type: Number, required: true }, // Index of the selected option
    }],
    timeSpent: { type: Number, required: true },// Total time spent on the exam (in seconds)
    totalMarks: { type: Number, required: true },
    score: { type: Number, default: null }, // The score after the exam is graded
     
    submittedAt: { type: Date, default: null }, // Timestamp of when the exam was submitted
  });

  const Submission = mongoose.models.Submission || mongoose.model('Submission', submissionSchema);
export default Submission;
