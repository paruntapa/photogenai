import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GenerateImage from '@/components/GenerateImage'
import Packs from '@/components/Packs'
import Train from '@/components/Train'
import Camera from '@/components/Camera'

const page = () => {
  return (
    <div className='flex justify-center '>
        <div className='w-2xl'>
        <div className='flex justify-center'>
        <Tabs defaultValue="account" className="w-[400px]">
        <div className='flex justify-center'>
            <TabsList>
                <TabsTrigger value="camera">Camera</TabsTrigger>  
                <TabsTrigger value="generate">Generate Image</TabsTrigger>
                <TabsTrigger value="packs">Packs</TabsTrigger>
                <TabsTrigger value="train">Train a Model</TabsTrigger>

            </TabsList>
        </div>
            <TabsContent value="generate"><GenerateImage/></TabsContent>
            <TabsContent value="packs"><Packs/></TabsContent>
            <TabsContent value="train"><Train/></TabsContent>
            <TabsContent value="camera"><Camera/></TabsContent>
    </Tabs>
        </div>
        </div>
    </div>
  )
}

export default page