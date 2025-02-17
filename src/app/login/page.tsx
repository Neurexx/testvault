"use client"
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function Signup() {

  const [userData,setUserData]=useState({})
  const [error,setError]=useState("")
  const [loading,setLoading]=useState(false)
  const router=useRouter()
  const {data:session, status}=useSession()

  
  useEffect(() => {
    if (status === 'loading') return;
    if (session?.user) {
      //@ts-ignore
      if(session?.user.role==="student"){
        router.push('/dashboard');}
      else{
      router.push('/teacher-dashboard');}
    }
  }, [session, status, router]);

  async function handleSubmit(e:FormEvent){
    
    
      e.preventDefault()
      setLoading(true)

      const result = await signIn('credentials', {
        redirect: false,
        //@ts-ignore
        identifier: userData.email,
        //@ts-ignore
        password: userData.password,
      });
  

     
      if (result?.error) {
        //@ts-ignore
        setError(result.error)

      }

      setLoading(false)
    
    }
    
  
    return (<>
      <header className="p-4">
        <Link href="/">Home</Link>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 py-12">
      <div className=" rounded-lg p-8 shadow border-t-4 rounded-tl-sm border-l-2 border-gray-400">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required onChange={(e)=>{setUserData({...userData,email:e.target.value})}} />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required onChange={(e)=>{setUserData({...userData,password:e.target.value})}}/>
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              {loading && <Spinner/>}
              {error.length>0 && <div className="">{error}</div>}
            </form>
          </div>
          </main>
      </>
    )
  }
  
