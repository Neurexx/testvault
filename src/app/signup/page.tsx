"use client"
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Signup() {

  const [userData,setUserData]=useState({})
  const [error,setError]=useState("")
  const [loading,setLoading]=useState(false)

  const router=useRouter()

  async function handleSubmit(e:FormEvent){
    
    try {
      e.preventDefault()
      setLoading(true)
      const res=await axios.post("/api/signup",userData)

      console.log(res)
      if(res.status===201){

        await signIn('credentials', {
          redirect: false,
          //@ts-ignore
          identifier: userData.email,
          //@ts-ignore
          password: userData.password,
        });
        router.push("/dashboard")
      }
        
  
    } catch (error) {
      //@ts-ignore
      if(error.response.data.message==="User with this email already exists")
        setError("User with this email already exists")
      
    }
    finally{
      setLoading(false)
    }
  }
    return (<>
      <header className="p-4">
        <Link href="/">Home</Link>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="border-t-4 rounded-tl-sm border-l-2 border-gray-400 rounded-lg p-8 shadow">
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
              {loading && <Spinner/>}

              {error.length>0 && <div className="">{error}</div>}
            </form>
          </div>
          </main>
      </>
    )
  }
  