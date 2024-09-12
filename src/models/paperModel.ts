import mongoose from 'mongoose';

const PaperSchema = new mongoose.Schema({
  collegeName: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  paperName:{
    type:String,
    required:true
  },
  paperCode: {
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
}, { timestamps: true });

const Paper = mongoose.models.Paper || mongoose.model('Paper', PaperSchema);
export default Paper;
