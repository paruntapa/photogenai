"use client"
import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from './ui/button';

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Appbar = () => {

  const {theme, setTheme } = useTheme()
  return (
    <div className='flex items-center border-b justify-between w-full h-16 px-4  text-white'>
    <div>
        <h1 className='text-2xl font-light text-white'>PhotoGenAI</h1>
    </div>
    <div className='flex items-center justify-center gap-3'>
        <SignedOut>
            <Button variant={"ghost"} className='text-black bg-zinc-100 hover:bg-zinc-200'>
            <SignInButton/>
            </Button>
        </SignedOut>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        <SignedIn>
            <UserButton />
        </SignedIn>
        </div>
    </div>
  )
}

export default Appbar