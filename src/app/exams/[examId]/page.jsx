/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ilolPt5hfb7
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

 // Assuming these are custom components
import axios from 'axios';

export default function ExamComponent() {
  
  const { examId } = useParams() // Get the exam ID from the URL query

  


  const [exam, setExam] = useState(null); // To store the exam data
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track current question
  const [answers, setAnswers] = useState({}); // Store user answers (questionId -> selectedOptionId)
  const [timeLeft, setTimeLeft] = useState(null); // Timer state
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        setCurrentQuestionIndex((prev) => Math.min(prev + 1, exam.questions.length - 1));
      } else if (event.key === 'ArrowLeft') {
        setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [exam]);
  // Fetch the exam data when the component loads
  
  useEffect(() => {
    if (examId) {
      axios.get(`/api/exams/${examId}`)
        .then(response => {
          setExam(response.data);
          setTimeLeft(response.data.duration * 60); // Set the time based on exam duration
        })
        .catch(error => {
          console.error('Error fetching exam:', error);
        });
    }
  }, [examId]);

  // Handle timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  // Handle answer selection
  const handleAnswerChange = (questionId, optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  // Submit exam
  const handleSubmit = () => {
    axios.post(`/api/exams/${examId}/submit`, { answers })
      .then(response => {
        // Redirect or show result after successful submission
        console.log('Exam submitted:', response.data);
        router.push(`/results/${examId}`);
      })
      .catch(error => {
        console.error('Error submitting exam:', error);
      });
  };

  if (!exam) return <div>Loading...</div>;

  const currentQuestion = exam.questions[currentQuestionIndex];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">{exam.title}</h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <ClockIcon className="w-5 h-5" />
            <span>{`${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}`}</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-muted-foreground">
          <span>Question {currentQuestionIndex + 1} of {exam.questions.length}</span>
          <div className="h-3 w-40 rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${((currentQuestionIndex + 1) / exam.questions.length) * 100}%` }}
            />
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-3xl mx-auto space-y-10">
          <div>
            <h2 className="text-xl font-bold">Question {currentQuestionIndex + 1}</h2>
            <p className="text-muted-foreground">{currentQuestion.text}</p>
            <div className="mt-4 space-y-4">
              {currentQuestion.options.map((option, index) => (
                <div className="flex items-center gap-3" key={index}>
                  <Checkbox
                    id={`option-${index}`}
                    checked={answers[currentQuestion._id] === index}
                    onChange={() => handleAnswerChange(currentQuestion._id, index)}
                  />
                  <label htmlFor={`option-${index}`} className="text-base">
                    {option.optionText}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t py-4 px-6 flex justify-between">
        <Button
          onClick={() => setCurrentQuestionIndex(prev => Math.max(prev - 1, 0))}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        {currentQuestionIndex < exam.questions.length - 1 ? (
          <Button onClick={() => setCurrentQuestionIndex(prev => prev + 1)}>
            Next
          </Button>
        ) : (
          <Button onClick={handleSubmit}>
            Submit Exam
          </Button>
        )}
      </div>
    </div>
  );
}



function ClockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}