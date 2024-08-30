import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Signup() {
    return (<>
      <header className="p-4">
        <Link href="/">Home</Link>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 py-12">
      <div className=" rounded-lg p-8 shadow">
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            <form className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Jared Palmer" required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </form>
          </div>
          </main>
      </>
    )
  }
  