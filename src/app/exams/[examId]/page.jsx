
"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {useSession} from "next-auth/react"
import { useEffect, useState,useRef } from "react";
import Spinner from "@/components/Spinner"
import { useParams, useRouter } from "next/navigation";
import * as faceapi from 'face-api.js';
// Assuming these are custom components
import axios from "axios";

export default function ExamComponent() {
  const { examId } = useParams(); // Get the exam ID from the URL query
  // const [videoStream, setVideoStream] = useState(null);
  // const videoRef = useRef(null);
  // const intervalRef = useRef(null);

  // const [eyeDirection, setEyeDirection] = useState('Looking at Screen');
  const router = useRouter();
  const [isExamActive, setIsExamActive] = useState(true);
  // const streamRef = useRef(null); // Store the stream reference

  const {data:session,status}=useSession()
  const [exam, setExam] = useState(null); // To store the exam data
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track current question
  const [answers, setAnswers] = useState({}); // Store user answers (questionId -> selectedOptionId)
  const [timeLeft, setTimeLeft] = useState(null); // Timer state
  
  const enterFullScreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  };

  const exitExam = () => {
    setIsExamActive(false);
    router.replace(`/exams`); // Redirect to an exam failed page
    alert("The exam is now stopped.");
  };

  // Fetch the exam data when the component loads

  useEffect(() => {
    if (examId) {
      axios
        .get(`/api/exams/${examId}`)
        .then((response) => {
          setExam(response.data);
          setTimeLeft(response.data.duration * 60);
          console.log(response); // Set the time based on exam duration
        })
        .catch((error) => {
          console.error("Error fetching exam:", error);
        });
    }
  }, [examId]);

  const handleVisibilityChange = () => {
    if (document.hidden) {
      exitExam();
    }
  };

  const handleFullScreenChange = () => {
    if (
      !document.fullscreenElement &&
      !document.webkitIsFullScreen &&
      !document.mozFullScreen &&
      !document.msFullscreenElement
    ) {
      exitExam(); // Exit exam if full-screen mode is left
    }
  };

  useEffect(() => {
    // Ensure the exam starts in full-screen mode
    enterFullScreen();

    // Listen for full-screen exit
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullScreenChange);
    document.addEventListener("mozfullscreenchange", handleFullScreenChange);
    document.addEventListener("MSFullscreenChange", handleFullScreenChange);

    // Listen for tab switching
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Clean up event listeners when the component unmounts
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullScreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullScreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullScreenChange
      );
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Handle timer countdown
  // useEffect(() => {
  //   if (timeLeft > 0) {
  //     const timer = setInterval(() => {
  //       setTimeLeft((prev) => prev - 1);
  //     }, 1000);
  //     return () => clearInterval(timer);
  //   }
  // }, [timeLeft]);
  // const detectEyeDirection = (leftEye, rightEye) => {
  //   // Eye positions can be analyzed based on relative positions of the left and right eye points.
  //   const eyeMidPoint = {
  //     x: (leftEye[0].x + rightEye[3].x) / 2,
  //     y: (leftEye[0].y + rightEye[3].y) / 2,
  //   };

  //   // Basic check to determine if the eyes are centered
  //   if (eyeMidPoint.x > 150 && eyeMidPoint.x < 450) {
  //     setEyeDirection('Looking at Screen');
      
  //   } else {
  //     setEyeDirection('Looking Away');
  //     router.replace("/exams")
  //   }
  // };

//   useEffect(()=>{


//     let interval;
    
//     async function loadModels() {
//       // Load models for face detection and landmark recognition
//       await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
//       await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
//     }

//     async function setupProctoring() {
//       // Load the models
//       await loadModels();

//       // Get webcam stream
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       setVideoStream(stream);
//       const videoElement = document.getElementById('webcam');
//       videoElement.srcObject = stream;
//       videoElement.play();

//       // Continuously detect faces and landmarks
//      interval= setInterval(async () => {
//         const detections = await faceapi.detectAllFaces(videoElement, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
//         if (detections.length === 0) {
          
//           router.replace("/exams")
//           }
          

        
//         else if(detections.length>1){
          
//           router.replace("/exams")
        
//         } else {
//           const landmarks = detections[0].landmarks;
//           const leftEye = landmarks.getLeftEye();
//           const rightEye = landmarks.getRightEye();

//           // Analyze eye positions
//           detectEyeDirection(leftEye, rightEye);
//         }
//       }, 2000);

      
//     }

//     setupProctoring();
// return ()=>{
//  clearInterval(interval)
// }
//   },[router])

// useEffect(() => {
//   const startVideoStream = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       streamRef.current=stream
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }
//     } catch (error) {
//       console.error('Error accessing webcam:', error);
//     }
//   };

//   startVideoStream();

  
//   return () => {
//     if (intervalRef.current) clearInterval(intervalRef.current);

//     // Stop the video tracks to turn off the webcam
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach((track) => track.stop());
//     }
//   };
// }, []);



  // Handle answer selection
  const handleAnswerChange = (questionId, optionIndex) => {
    setAnswers({
      ...answers,
      [questionId]: optionIndex
  });
  };

  // Submit exam
  const handleSubmit = () => {
    const submissionData = {
      studentId: session.user._id, // Replace with actual student ID (e.g., from session)
      examId,
      answers: Object.keys(answers).map(questionId => ({
        question: questionId,
        selectedOption: answers[questionId],
      })),
      timeSpent: exam.duration * 60 - timeLeft, // Time spent in seconds
    };
    console.log(submissionData)

    axios
      .post(`/api/exams/${examId}/submit`, submissionData)
      .then((response) => {
        
        // Redirect or show result after successful submission
        console.log("Exam submitted:", response.data);
        router.replace("/exams")
        
      })
      .catch((error) => {
        console.error("Error submitting exam:", error);
      });
  };

  if (!exam)  return <div className="flex w-screen h-screen items-center justify-center"><Spinner size="w-16 h-16"/></div>;;

  const currentQuestion = exam.questions[currentQuestionIndex];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">{exam.title}</h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>{`${Math.floor(timeLeft / 60)}:${String(
              timeLeft % 60
            ).padStart(2, "0")}`}</span>
          </div>
        </div>
       {/* <video id="webcam" ref={videoRef} autoPlay width="600" height="400" className="fixed top-0 right-0"  />
         
      <p>Eye Direction: {eyeDirection}</p> */}
        <div className="flex items-center gap-4 text-muted-foreground">
          <span>{exam.questions.length} Questions</span>
          <div className="h-3 w-40 rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `100%` }}
            />
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-6">
      <div className="max-w-3xl mx-auto space-y-10">
        {exam.questions.map((question, index) => (
          <div key={question._id} className="m-4 p-4">
            <h2 className="text-xl font-bold">Question {index + 1}</h2>
            <p className="text-muted-foreground mt-4">{question.text}</p>
            <div className="mt-4 space-y-4">
              {question.options.map((option, optionIndex) => (
                <div className="flex items-center gap-3" key={`${question._id}-${optionIndex}`}>
                  <input
                type="radio"
                id={`option-${optionIndex}-${index}`}
                name={`question-${question._id}`} // Group the radio buttons by question
                checked={answers[question._id] === optionIndex}
                onChange={() => handleAnswerChange(question._id, optionIndex)}
              />
              <label
                htmlFor={`option-${optionIndex}-${index}`}
                className="text-base"
              >
                {option.optionText}
              </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      </div>

      <div className="border-t py-4 px-6 flex justify-end">
        <Button onClick={handleSubmit}>Submit Exam</Button>
      </div>
    </div>
  );
}
