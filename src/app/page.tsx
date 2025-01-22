"use client"
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import ThemeToggle from "@/components/ThemeToggle"

export default function Component() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Wait for session status to load
    if (session?.user) {
      router.push('/dashboard'); // Redirect to dashboard if session exists
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <p>Loading...</p>; // Optional loading state
  }

  if (session?.user) {
    return null; // Prevent rendering while redirecting
  }
  
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-center">
      
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <ThemeToggle/>
          <Link href="/signup" className="text-sm  font-medium hover:underline underline-offset-4" prefetch={false}>
            Sign up
          </Link>
          <Link href="/login" className="text-sm  font-medium hover:underline underline-offset-4" prefetch={false}>
            Login
          </Link>
          <Link href="/papers" className="text-sm   font-medium hover:underline underline-offset-4" prefetch={false}>
            Papers
          </Link>
          <Link href="/smartq" className="text-sm   font-medium hover:underline underline-offset-4" prefetch={false}>
            Make your own quiz with AI
          </Link>
        </nav>
      </header>
      <main className="flex-1 justify-center items-center">
        <section className="w-full py-5 flex justify-center items-center">
          <div className=" px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Ace Your Exams with TestVault
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Unlock a world of exam success with TestVault. Access college exam papers and take practice tests
                    online to boost your performance.
                  </p>
                </div>
                {/* <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Get Started
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Learn More
                  </Link>
                </div> */}
              </div>
              <img
                src="https://images.prismic.io/prodigy-website/3b23b533-c408-4380-bce6-0820b89131e9_math-on-board.jpeg?auto=compress%2Cformat&rect=0%2C874%2C6048%2C2016&w=1920&h=640&fit=max"
                width="550"
                height="310"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        <section className="w-full flex flex-col items-center justify-center py-12 sm:py-16 md:py-24 lg:py-32 bg-muted">
  <div className="container px-4 sm:px-6">
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
          Unlock Your Exam Potential
        </h2>
        <p className="max-w-[900px] text-muted-foreground text-base sm:text-lg md:text-xl/relaxed">
          TestVault provides you with the tools you need to excel in your college exams. Access a vast library of past
          exam papers and practice online tests to boost your confidence and performance.
        </p>
      </div>
    </div>
    <div className="mx-auto grid max-w-full items-center gap-6 py-8 sm:py-10 md:py-12 lg:py-12 lg:grid-cols-2 lg:gap-12">
      <div className="flex flex-col items-center justify-center space-y-4">
        <ul className="grid gap-6 w-full">
          <li>
            <div className="flex flex-col flex-wrap">
              <h3 className="text-lg sm:text-xl font-bold">Exam Papers</h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                Access a comprehensive library of past college exam papers to practice and prepare.
              </p>
            </div>
          </li>
          <li>
            <div className="grid gap-1">
              <h3 className="text-lg sm:text-xl font-bold">Online Exams</h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                Take practice tests online to simulate the real exam experience and identify areas for improvement.
              </p>
            </div>
          </li>
        </ul>
      </div>
      <img
        src="https://blogimages.softwaresuggest.com/blog/wp-content/uploads/2022/06/29130201/10-Online-Examination-Software-Features-That-Make-Online-Exams-A-Breeze-01-1024x555.png"
        alt="Features"
        className="w-full mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center lg:w-[550px]"
      />
    </div>
  </div>
</section>


<section className="w-full flex flex-col items-center justify-center py-12 sm:py-16 md:py-24 lg:py-32">
  <div className="px-4 sm:px-6">
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
          Testimonials
        </h2>
        <p className="max-w-[900px] text-muted-foreground text-base sm:text-lg md:text-xl/relaxed">
          Hear from students who have used TestVault to ace their exams.
        </p>
      </div>
    </div>
    <div className="mx-auto grid max-w-full lg:max-w-5xl items-center gap-6 py-8 sm:py-10 md:py-12 lg:py-12 lg:grid-cols-2 lg:gap-12">
      <div className="flex flex-col justify-center space-y-4 w-full">
        <div className="rounded-lg bg-card p-6 shadow-sm">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt="@username" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-sm text-muted-foreground">Computer Science Student</p>
            </div>
          </div>
          <p className="mt-4 text-muted-foreground">
            &quot;TestVault has been a game-changer for me. The access to past exam papers and the online practice tests have significantly improved my exam performance.&quot;
          </p>
        </div>
        <div className="rounded-lg bg-card p-6 shadow-sm">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt="@username" />
              <AvatarFallback>SA</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Sarah Anderson</p>
              <p className="text-sm text-muted-foreground">Business Administration Student</p>
            </div>
          </div>
          <p className="mt-4 text-muted-foreground">
            &quot;I highly recommend TestVault to any student looking to improve their exam scores. The platform is user-friendly and the content is top-notch.&quot;
          </p>
        </div>
      </div>
      <img
        src="https://media.gettyimages.com/id/1333231964/video/university-student-friends-working-on-laptop-and-books-sitting-on-the-steps-in-the-campus.jpg?s=640x640&k=20&c=zL022zfJWQ_4b6j_rG7igoUQPBXeI7hBpuMkDvM2p38="
        alt="Testimonials"
        className="w-full mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center lg:w-[550px]"
      />
    </div>
  </div>
</section>

<section className="w-full py-12 sm:py-16 md:py-24 lg:py-32">
  <div className="container px-4 sm:px-6">
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
          Experience Online Exams
        </h2>
        <p className="max-w-[900px] text-muted-foreground text-base sm:text-lg md:text-xl/relaxed">
          TestVault&aposs online exam feature provides a realistic simulation of the real exam experience, helping you identify and address your weaknesses.
        </p>
      </div>
    </div>
    <div className="mx-auto grid max-w-full lg:max-w-5xl items-center gap-6 py-8 sm:py-10 md:py-12 lg:py-12 lg:grid-cols-2 lg:gap-12">
      <img
        src="https://cdn.edclass.com/wp-content/uploads/online-exams.jpg"
        width="550"
        height="310"
        alt="Online Exams"
        className="w-full mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center lg:w-[550px] lg:order-last"
      />
      <div className="flex flex-col justify-center space-y-4 w-full">
        <ul className="grid gap-6">
          <li>
            <div className="grid gap-1">
              <h3 className="text-lg sm:text-xl font-bold">Timed Exams</h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                Take practice tests under timed conditions to simulate the real exam experience.
              </p>
            </div>
          </li>
          <li>
            <div className="grid gap-1">
              <h3 className="text-lg sm:text-xl font-bold">Detailed Feedback</h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                Receive comprehensive feedback on your performance, including areas for improvement.
              </p>
            </div>
          </li>
          <li>
            <div className="grid gap-1">
              <h3 className="text-lg sm:text-xl font-bold">Adaptive Difficulty</h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                The online exams adjust in difficulty to challenge you and help you grow.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Start Your Exam Prep Journey</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Sign up for TestVault today and unlock your full potential.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex gap-2">
                <Input type="email" placeholder="Enter your email" className="max-w-lg flex-1" />
                <Button type="submit">Get Started</Button>
              </form>
              <p className="text-xs text-muted-foreground">
                Sign up to access our full library of exam resources.{" "}
                <Link href="#" className="underline underline-offset-2" prefetch={false}>
                  Terms &amp; Conditions
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 TestVault. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
        </nav>
      </footer>
    </div>
  )
}
//@ts-ignore
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

// import Image from "next/image";

// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <h1 className="text-3xl">TestVault</h1>
//     </main>
//   );
// }
