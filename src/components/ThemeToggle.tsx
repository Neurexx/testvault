"use client"
import {useTheme} from "next-themes"
import {Moon,Sun} from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

export default function ThemeToggle(){
    const {theme,setTheme}=useTheme()
    const [mounted,setMounted]=useState(false)

    useEffect(()=>{
        setMounted(true)

    },[])

    if(!mounted){
        return(
            <Button disabled={true} 
             >


            </Button>
        )
    }

    return(
        <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
             >

{theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
            </Button>
    )

    
}
