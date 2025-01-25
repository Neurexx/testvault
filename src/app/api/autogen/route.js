import { NextResponse } from "next/server";
import pdf from "pdf-parse";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

async function isValidPDF(pdfFile) {
  

  try {
    if(pdfFile.type!=="application/pdf")
        return false
    const buffer = Buffer.from(await pdfFile.arrayBuffer());
    const signature = buffer.toString("ascii", 0, 5);
    if (signature !== "%PDF-") {
      return false;
    }
    await pdf(buffer);
    return true;
  } catch (error) {
    console.error("PDF validation error:", error);
    return false;
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();

    const pdfFile = formData.get("pdf");
    if (!pdfFile || !pdfFile.size) {
      return NextResponse.json(
        { error: "No PDF file provided" },
        { status: 400 }
      );
    }

    const MAX_FILE_SIZE = 15 * 1024 * 1024;
    if (pdfFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File size exceeds 15MB limit" },
        { status: 400 }
      );
    }
   
   

    const isPDFValid = await isValidPDF(pdfFile);
    if (!isPDFValid) {
      return NextResponse.json(
        { error: "Invalid PDF file format or corrupted file" },
        { status: 400 }
      );
    }

    const numberOfQuestions = parseInt(formData.get("numberOfQuestions"));
    if (
      isNaN(numberOfQuestions) ||
      numberOfQuestions < 1 ||
      numberOfQuestions > 50
    ) {
      return NextResponse.json(
        { error: "Number of questions must be between 1 and 50" },
        { status: 400 }
      );
    }
   const fileBuffer=Buffer.from(await pdfFile.arrayBuffer())
    const pdfData = await pdf(fileBuffer);
    const text = pdfData.text;

    const wordCount = text.trim().split(/\s+/).length;
    if (wordCount > 10000) {
      return NextResponse.json(
        {
          error: "PDF content exceeds 10000 words limit",
          wordCount: wordCount,
        },
        { status: 400 }
      );
    }

    if (wordCount < 50) {
      return NextResponse.json(
        {
          error: "PDF content too short (minimum 50 words required)",
          wordCount: wordCount,
        },
        { status: 400 }
      );
    }

    const prompt = `Generate ${numberOfQuestions} multiple-choice questions from the following text.
        Provide 4 options (A, B, C, D) and indicate the correct answer.
        Include a field "marks" with default value 1 for each question.
        Format the output as a JSON array of objects, where each object has the following structure:
        {"question": "The MCQ question","options": ["Option A", "Option B", "Option C", "Option D"],"answer": "Correct option (A, B, C, or D)","marks": 1
        }

        Text:
        ${text}`;


    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.3,
      },
    });

    let mcqs;
    try {
      mcqs = JSON.parse(result.response.text().slice(8, -4));

      if (!Array.isArray(mcqs)) {
        throw new Error("Invalid response format");
      }

      mcqs.forEach((mcq, index) => {
        if (
          !mcq.question ||
          !Array.isArray(mcq.options) ||
          mcq.options.length !== 4 ||
          !["A", "B", "C", "D"].includes(mcq.answer) ||
          typeof mcq.marks !== "number"
        ) {
          throw new Error(`Invalid question format at index ${index}`);
        }
      });
    } catch (error) {
      console.error("Error parsing or validating Gemini response:", error);
      return NextResponse.json(
        { error: "Failed to generate valid questions" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      questions: mcqs,
    },{status:200});
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: error.message || "Error processing request" },
      { status: 500 }
    );
  }
}
