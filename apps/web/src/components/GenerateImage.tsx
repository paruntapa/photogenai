"use client"
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Textarea } from "@/components/ui/textarea"
import axios from 'axios'
import { BACKEND_URL } from 'app/config'
import { useAuth } from '@clerk/nextjs'
import { SelectModel } from './Models'


const GenerateImage =  () => {
  const [prompt, setPrompt] = useState("")
  const [selectedModels, setSelectedModel] = useState<string>() 

  const {getToken} = useAuth()
  

  return (
    <div className='flex justify-center items-center h-[60vh] '>
      <div>
        <SelectModel selectedModel={selectedModels}  setSelectedModel={setSelectedModel}/>
        <div className='flex justify-center'>
          <Textarea placeholder='Describe the image you want to see here.' onChange={(e)=> {
            setPrompt(e.target.value)
          }} className='py-3 px-4 outline-none focus:border-blue-300  hover:border-blue-300 w-2xl '></Textarea>
          </div>
          <div className='flex justify-center pt-4'>
          <Button onClick={
            async () => {
              const token = await getToken()
              await axios.post(`${BACKEND_URL}/ai/generate`, {
                modelId: selectedModels,
                prompt: prompt,
                num: 1
              }, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              })
              
            }
          } variant={"secondary"}>Create Image</Button>
          </div>
      </div>
      </div>
  )
}

export default GenerateImage