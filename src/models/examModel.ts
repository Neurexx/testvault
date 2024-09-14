import mongoose from "mongoose";
const Schema = mongoose.Schema;


const examSchema = new Schema({
  title: { type: String, required: true },
  
  date: { type: Date },
  duration: { type: Number, required: true }, // in minutes
  totalMarks: { type: Number, required: true },
  description: { type: String },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
   
  }, { timestamps: true });

  const Exam =mongoose.models.Exam || mongoose.model('Exam', examSchema);

  export default Exam