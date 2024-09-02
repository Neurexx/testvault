import mongoose from "mongoose";
const Schema = mongoose.Schema;



const paperSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    exam: {
      type: Schema.Types.ObjectId,
      ref: 'Exam',
      required: true,
    },
  }, { timestamps: true });

  export const Paper =mongoose.models.Paper || mongoose.model('Paper', paperSchema);