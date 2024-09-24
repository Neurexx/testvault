import dbConnect from "@/lib/dbConnect"
import Submission from "../../../../models/submissionModel"
import { NextResponse } from "next/server";


function formatDateToYYYYMMDD(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  // API route: /api/progress/[studentId]
  export async function POST(req) {
    
    await dbConnect();
    
  
    try {
      // Fetch all submissions for the student
      
           const {studentId}=await req.json()
   

      
      const submissions = await Submission.find({ student: studentId });
     
      // Group submissions by day and calculate aggregate data
      const aggregateData = submissions.reduce((acc, submission) => {
        // Format the submission date to group by day
        const submissionDay = formatDateToYYYYMMDD(submission.submittedAt);
        
        // Initialize data for the day if not present
        if (!acc[submissionDay]) {
          acc[submissionDay] = {
            date: submissionDay,
            totalMarks: 0,
            totalScore: 0,
            totalTimeSpent: 0,
            count: 0,
          };
        }
  
        // Accumulate the data
        acc[submissionDay].totalMarks += submission.totalMarks;
        acc[submissionDay].totalScore += submission.score || 0;
        acc[submissionDay].totalTimeSpent += submission.timeSpent;
        acc[submissionDay].count += 1;
  
        return acc;
      }, {});
      
      // Convert the result into an array with average values for charting
      const result = Object.values(aggregateData).map(dayData => ({
        date: dayData.date,
        averageScore: dayData.totalScore / dayData.count,
        averageMarks: dayData.totalMarks / dayData.count,
        averageTimeSpent: dayData.totalTimeSpent / dayData.count,
      }));
      
      // Return the aggregated data
      return NextResponse.json(result,{status:200});
    } catch (error) {
        console.log(error)
      return NextResponse.json({ error: 'Failed to fetch submissions' },{status:500});
    }
  }
