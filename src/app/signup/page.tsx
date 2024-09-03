"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Signup() {

  const [userData,setUserData]=useState({})
  const [error,setError]=useState("")
  const router=useRouter()

  async function handleSubmit(e:FormEvent){
    
    try {
      e.preventDefault()
      const res=await axios.post("/api/signup",userData)

      console.log(res)
      if(res.status===201)
        router.push('/dashboard')
  
    } catch (error) {
      //@ts-ignore
      if(error.response.data.message==="User with this email already exists")
        setError("User with this email already exists")
      
    }
  }
    return (<>
      <header className="p-4">
        <Link href="/">Home</Link>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 py-12">
      <div className=" rounded-lg p-8 shadow">
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Jared Palmer" required onChange={(e)=>{setUserData({...userData,name:e.target.value})}} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required onChange={(e)=>{setUserData({...userData,email:e.target.value})}} />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required onChange={(e)=>{setUserData({...userData,password:e.target.value})}}/>
              </div>
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
              {error.length>0 && <div className="">{error}</div>}
            </form>
          </div>
          </main>
      </>
    )
  }
  