"use client"

import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { Button } from './ui/button'
import { SignedIn, SignedOut, SignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

const Hero = () => {
  return (
    <div className='flex justify-center ' >
        <div className='max-w-4xl'>
        <h1 className='text-4xl m-[10%]  text-center '>
             <span className='text-6xl'>Transform</span> <br /> Your Photos with <span className='rounded-full p-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>AI Magic</span>
        </h1>
        <Carousel>
        <CarouselContent>
            <CarouselItem className='basis-1/4'><img className='w-full h-full' src={"/assets/1.webp"} alt="" /></CarouselItem>
            <CarouselItem className='basis-1/4'><img className='w-full h-full' src={"/assets/2.webp"} alt="" /></CarouselItem>
            <CarouselItem className='basis-1/4'><img className='w-full h-full' src={"/assets/3.webp"} alt="" /></CarouselItem>
            <CarouselItem className='basis-1/4'><img className='w-full h-full' src={"/assets/4.webp"} alt="" /></CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        </Carousel>

        <div className='m-10 flex flex-col items-center'>
          <SignedOut>
        <Button size={"lg"} variant={"outline"}>Login</Button>
        </SignedOut>
        <SignedIn>
          <Button onClick={()=> {
            redirect("/dashboard")
          }} size={"lg"} variant={"outline"}>Dashboard</Button>
        </SignedIn>
        </div>

    </div>
    </div>
  )
}

export default Hero