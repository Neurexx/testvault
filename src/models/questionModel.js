import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  text: { type: String,required:true  },
  options: [
    {
      optionText: { type: String, required: true },
      isCorrect: { type: Boolean, default: false }, // to mark correct answers
    },
  ],
  marks: { type: Number ,required:true },
});

const Question = mongoose.models.Question || mongoose.model('Question', QuestionSchema);
export default Question;
