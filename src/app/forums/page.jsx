
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <header className="bg-primary text-primary-foreground py-4 px-6 shadow">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <BookIcon className="h-6 w-6" />
            <span className="text-xl font-bold">Exam Helper</span>
          </Link>
          <nav className="hidden md:flex items-center gap-4">
            <Link href="#" className="hover:underline" prefetch={false}>
              Threads
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Resources
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              About
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Contact
            </Link>
          </nav>
        </div>
      </header> */}
      <main className="flex-1 py-8 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            
            <div className="flex items-center gap-4">
              <Input type="text" placeholder="Search threads..." className="max-w-xs" />
              <Select defaultValue="latest">
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="most-replies">Most Replies</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  <Link href="#" className="font-medium hover:underline" prefetch={false}>
                    How to prepare for the Calculus final exam
                  </Link>
                </CardTitle>
                <CardDescription>Tips and strategies for acing your Calculus final exam.</CardDescription>
              </CardHeader>
              <CardFooter className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MessageCircleIcon className="h-4 w-4" />
                  <span>12 replies</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                    <AvatarFallback>AC</AvatarFallback>
                  </Avatar>
                  <span>@janesmith</span>
                </div>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>
                  <Link href="#" className="font-medium hover:underline" prefetch={false}>
                    Best study tips for the Biology midterm
                  </Link>
                </CardTitle>
                <CardDescription>Ace your Biology midterm with these proven study techniques.</CardDescription>
              </CardHeader>
              <CardFooter className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MessageCircleIcon className="h-4 w-4" />
                  <span>8 replies</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                    <AvatarFallback>AC</AvatarFallback>
                  </Avatar>
                  <span>@michaelj</span>
                </div>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>
                  <Link href="#" className="font-medium hover:underline" prefetch={false}>
                    How to tackle the Economics final project
                  </Link>
                </CardTitle>
                <CardDescription>Strategies for completing your Economics final project with ease.</CardDescription>
              </CardHeader>
              <CardFooter className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MessageCircleIcon className="h-4 w-4" />
                  <span>16 replies</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                    <AvatarFallback>AC</AvatarFallback>
                  </Avatar>
                  <span>@sarahb</span>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <footer className="bg-muted text-muted-foreground py-4 px-6 mt-auto">
        <div className="container mx-auto flex justify-center p-4">
          <Link
            href="#"
            className="inline-flex items-center gap-2 rounded-md bg-primary  px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            prefetch={false}
          >
            <PlusIcon className="h-4 w-4" />
            Create New Thread
          </Link>
        </div>
      </footer>
    </div>
  )
}

function BookIcon(props) {
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
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  )
}


function MessageCircleIcon(props) {
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
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  )
}


function PlusIcon(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}