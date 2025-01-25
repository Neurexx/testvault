"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroupItem, RadioGroup } from '@/components/ui/radio-group';

const MCQQuiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelection = (value) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: value,
    });
  };

  const calculateScore = () => {
    let newScore = 0;
    Object.keys(selectedAnswers).forEach((questionIndex) => {
      if (selectedAnswers[questionIndex] === questions[questionIndex].answer) {
        newScore += questions[questionIndex].marks;
      }
    });
    setScore(newScore);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const navigateQuestion = (direction) => {
    if (direction === 'next' && currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (direction === 'prev' && currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (!questions || questions.length === 0) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-6">
          <p className="text-center text-gray-500">No questions available</p>
        </CardContent>
      </Card>
    );
  }

  if (showResults) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <p className="text-center text-xl">
              Your Score: {score} out of {questions.reduce((acc, q) => acc + q.marks, 0)}
            </p>
            <div className="space-y-4">
              {questions.map((question, index) => (
                <div key={index} className="p-4 rounded-lg bg-gray-50">
                  <p className="font-medium">{question.question}</p>
                  <p className="mt-2">
                    Your answer: {selectedAnswers[index] || 'Not answered'}
                    {selectedAnswers[index] === question.answer ? (
                      <span className="text-green-600 ml-2">✓ Correct</span>
                    ) : (
                      <span className="text-red-600 ml-2">✗ Incorrect (Correct: {question.answer})</span>
                    )}
                  </p>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <Button onClick={resetQuiz}>Retake Quiz</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          Question {currentQuestion + 1} of {questions.length}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <p className="text-lg font-medium">{currentQ.question}</p>
          <RadioGroup
            value={selectedAnswers[currentQuestion] || ''}
            onValueChange={handleAnswerSelection}
            className="space-y-3 p-4"
          >
            {currentQ.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={String.fromCharCode(65 + index)}
                  id={`option-${index}`}
                />
                <label
                  htmlFor={`option-${index}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option}
                </label>
              </div>
            ))}
          </RadioGroup>
          <div className="flex justify-between mt-6">
            <Button
              onClick={() => navigateQuestion('prev')}
              disabled={currentQuestion === 0}
              variant="outline"
            >
              Previous
            </Button>
            <Button
              onClick={() => navigateQuestion('next')}
              disabled={currentQuestion === questions.length - 1}
              variant="outline"
            >
              Next
            </Button>
          </div>
          {currentQuestion === questions.length - 1 && (
            <div className="text-center mt-4">
              <Button
                onClick={calculateScore}
                
                className="w-full"
              >
                Submit Quiz
              </Button>
            </div>
          )}
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              Questions answered: {Object.keys(selectedAnswers).length} of {questions.length}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MCQQuiz;