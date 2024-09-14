/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ilolPt5hfb7
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Final Exam</h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <ClockIcon className="w-5 h-5" />
            <span>45:00</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-muted-foreground">
          <span>Question 3 of 10</span>
          <div className="h-3 w-40 rounded-full bg-muted">
            <div className="h-full w-1/3 rounded-full bg-primary" />
          </div>
        </div>
      </header>
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-3xl mx-auto space-y-10">
          {/* Question 1 */}
          <div>
            <h2 className="text-xl font-bold">Question 1</h2>
            <p className="text-muted-foreground">What is the capital city of France?</p>
            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-3">
                <Checkbox id="answer1" />
                <label htmlFor="answer1" className="text-base">
                  Paris
                </label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox id="answer2" />
                <label htmlFor="answer2" className="text-base">
                  London
                </label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox id="answer3" />
                <label htmlFor="answer3" className="text-base">
                  Berlin
                </label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox id="answer4" />
                <label htmlFor="answer4" className="text-base">
                  Madrid
                </label>
              </div>
            </div>
          </div>

          {/* Question 2 */}
          <div>
            <h2 className="text-xl font-bold">Question 2</h2>
            <p className="text-muted-foreground">Which of the following is a programming language?</p>
            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-3">
                <Checkbox id="answer1" />
                <label htmlFor="answer1" className="text-base">
                  English
                </label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox id="answer2" />
                <label htmlFor="answer2" className="text-base">
                  Mathematics
                </label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox id="answer3" />
                <label htmlFor="answer3" className="text-base">
                  Python
                </label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox id="answer4" />
                <label htmlFor="answer4" className="text-base">
                  History
                </label>
              </div>
            </div>
          </div>

          {/* Question 3 */}
          <div>
            <h2 className="text-xl font-bold">Question 3</h2>
            <p className="text-muted-foreground">Which of the following is a fruit?</p>
            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-3">
                <Checkbox id="answer1" />
                <label htmlFor="answer1" className="text-base">
                  Apple
                </label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox id="answer2" />
                <label htmlFor="answer2" className="text-base">
                  Pencil
                </label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox id="answer3" />
                <label htmlFor="answer3" className="text-base">
                  Car
                </label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox id="answer4" />
                <label htmlFor="answer4" className="text-base">
                  Desk
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t py-4 px-6">
        <Button type="submit" className="ml-auto block">
          Submit Exam
        </Button>
      </div>
    </div>
  )
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