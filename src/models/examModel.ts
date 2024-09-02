import mongoose from "mongoose";
const Schema = mongoose.Schema;


const examSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    papers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Paper',
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  }, { timestamps: true });

  export const Exam =mongoose.models.Exam || mongoose.model('Exam', examSchema);