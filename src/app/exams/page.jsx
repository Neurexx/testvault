"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {  CheckIcon,BookIcon,BarChartIcon,ExamIcon,ForumIcon,SettingsIcon} from "@/components/icons"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import ExamComponent from "./[examId]/page";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Card, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { usePathname } from "next/navigation";
export default function Component() {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const path=usePathname()
     console.log(path)
    useEffect(() => {
  
     async function fetchExams() {
      try{
      const res= await fetch("/api/exams",{next:{tags:['exams']}})
     const data=await res.json()
     setExams(data)
     setLoading(false);
      }catch(e){
       console.error(e)
       setLoading(false);
      }
     }
     fetchExams()

    
    }, []);
  
    if (loading) return <div>Loading...</div>;
  
    return (
      <div className="flex w-full flex-col">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Link
              href="/dashboard"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg bg-accent font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
              prefetch={false}
            >
              <BookIcon className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">College Dashboard</span>
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/papers"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <CheckIcon className="h-5 w-5" />
                  <span className="sr-only">Exam Papers</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Exam Papers</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/exams"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground bg-primary transition-colors hover:text-foreground md:h-8 md:w-8`}
                  prefetch={false}
                >
                  <ExamIcon className="h-5 w-5 fill-white" />
                  <span className="sr-only">Online Exams</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Online Exams</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/progress"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <BarChartIcon className="h-5 w-5" />
                  <span className="sr-only">Progress Tracker</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Progress Tracker</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/threads"
                  className="flex h-9 w-9 bg-accent items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <ForumIcon className="h-5 w-5 " />
                  <span className="sr-only">Community</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Community</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <SettingsIcon className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <main className=" gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <h1 className="text-2xl font-bold mb-4">Available Exams</h1>
        <div className="space-y-4 w-full">
          {exams.map((exam) => (
            <Card key={exam._id} className="shadow-lg p-4 w-full">
              <CardContent>
                <CardTitle>{exam.title}</CardTitle>
              </CardContent>
              <CardContent>Duration: {exam.duration} mins</CardContent>
              <CardFooter>
                <Link href={`/exams/${exam._id}`} className="text-blue-500 hover:underline">
                  <Button>Start Exam</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div></main>
      </div>
        
      </div>
    );
  }

// export default function Component() {
//   return (
//     <div className="flex flex-col min-h-screen bg-background">
//       <header className="flex items-center justify-between border-b px-6 py-4">
//         <div className="flex items-center gap-4">
//           <h1 className="text-2xl font-bold">Final Exam</h1>
//           <div className="flex items-center gap-2 text-muted-foreground">
//             <ClockIcon className="w-5 h-5" />
//             <span>45:00</span>
//           </div>
//         </div>
//         <div className="flex items-center gap-4 text-muted-foreground">
//           <span>Question 3 of 10</span>
//           <div className="h-3 w-40 rounded-full bg-muted">
//             <div className="h-full w-1/3 rounded-full bg-primary" />
//           </div>
//         </div>
//       </header>
//       <div className="flex-1 overflow-auto p-6">
//         <div className="max-w-3xl mx-auto space-y-10">
//           {/* Question 1 */}
//           <div>
//             <h2 className="text-xl font-bold">Question 1</h2>
//             <p className="text-muted-foreground">What is the capital city of France?</p>
//             <div className="mt-4 space-y-4">
//               <div className="flex items-center gap-3">
//                 <Checkbox id="answer1" />
//                 <label htmlFor="answer1" className="text-base">
//                   Paris
//                 </label>
//               </div>
//               <div className="flex items-center gap-3">
//                 <Checkbox id="answer2" />
//                 <label htmlFor="answer2" className="text-base">
//                   London
//                 </label>
//               </div>
//               <div className="flex items-center gap-3">
//                 <Checkbox id="answer3" />
//                 <label htmlFor="answer3" className="text-base">
//                   Berlin
//                 </label>
//               </div>
//               <div className="flex items-center gap-3">
//                 <Checkbox id="answer4" />
//                 <label htmlFor="answer4" className="text-base">
//                   Madrid
//                 </label>
//               </div>
//             </div>
//           </div>

//           {/* Question 2 */}
//           <div>
//             <h2 className="text-xl font-bold">Question 2</h2>
//             <p className="text-muted-foreground">Which of the following is a programming language?</p>
//             <div className="mt-4 space-y-4">
//               <div className="flex items-center gap-3">
//                 <Checkbox id="answer1" />
//                 <label htmlFor="answer1" className="text-base">
//                   English
//                 </label>
//               </div>
//               <div className="flex items-center gap-3">
//                 <Checkbox id="answer2" />
//                 <label htmlFor="answer2" className="text-base">
//                   Mathematics
//                 </label>
//               </div>
//               <div className="flex items-center gap-3">
//                 <Checkbox id="answer3" />
//                 <label htmlFor="answer3" className="text-base">
//                   Python
//                 </label>
//               </div>
//               <div className="flex items-center gap-3">
//                 <Checkbox id="answer4" />
//                 <label htmlFor="answer4" className="text-base">
//                   History
//                 </label>
//               </div>
//             </div>
//           </div>

//           {/* Question 3 */}
//           <div>
//             <h2 className="text-xl font-bold">Question 3</h2>
//             <p className="text-muted-foreground">Which of the following is a fruit?</p>
//             <div className="mt-4 space-y-4">
//               <div className="flex items-center gap-3">
//                 <Checkbox id="answer1" />
//                 <label htmlFor="answer1" className="text-base">
//                   Apple
//                 </label>
//               </div>
//               <div className="flex items-center gap-3">
//                 <Checkbox id="answer2" />
//                 <label htmlFor="answer2" className="text-base">
//                   Pencil
//                 </label>
//               </div>
//               <div className="flex items-center gap-3">
//                 <Checkbox id="answer3" />
//                 <label htmlFor="answer3" className="text-base">
//                   Car
//                 </label>
//               </div>
//               <div className="flex items-center gap-3">
//                 <Checkbox id="answer4" />
//                 <label htmlFor="answer4" className="text-base">
//                   Desk
//                 </label>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="border-t py-4 px-6">
//         <Button type="submit" className="ml-auto block">
//           Submit Exam
//         </Button>
//       </div>
//     </div>
//   )
// }

// function ClockIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <circle cx="12" cy="12" r="10" />
//       <polyline points="12 6 12 12 16 14" />
//     </svg>
//   )
// }
