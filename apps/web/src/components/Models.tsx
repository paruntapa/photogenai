"use client"

import React, { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { Skeleton } from './ui/skeleton'
import { BACKEND_URL } from 'app/config';
import axios from 'axios';

interface TModel {
    id: string;
    thumbnail: string;
    name: string;
    trainingStatus: "Generated" | "Pending";
  }

  interface ModelProps {
    setSelectedModel: (model: string) => void;
    selectedModel?: string;
  }
  
export const SelectModel = ({ selectedModel, setSelectedModel }: ModelProps) => {
  const [modelLoading, setModelLoading] = useState(true)
  const [models, setModels] = useState<TModel[]>([])
  const { getToken } = useAuth()

  useEffect(()=> {
    (async ()=> {

      setModelLoading(true)
      const token = await getToken()
      const response = await axios.get(`${BACKEND_URL}/models`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
  console.log(response)

      setModels(response.data.models)
      setSelectedModel(response.data.models[0]?.id)
      setModelLoading(false)
    })()
  }, [])

  return (
    <div>
      <div className='text-2xl mb-4'> 
        Select Model
      </div>
      <div className='max-w-4xl'>
        <div className='mb-3'>
          <div className='grid grid-cols-4 gap-2 rounded-lg '>
            {models
            .map((model, idx) => <div key={idx} className={`${selectedModel === model.id ? "border-red-400" : ""} cursor-pointer rounded p-2 border-2 border-gray-300 `} 
            onClick={()=> {
              setSelectedModel(model.id)
            }}> 
            <img src={model.thumbnail} alt=""  className='rounded mb-2'/>
            {model.name}
            </div>)}
          </div>
          {modelLoading && <div className='grid grid-cols-4 gap-2 rounded-lg '>
              <Skeleton className='h-40 w-[100px]  rounded'/>
              <Skeleton className='h-40 w-[100px]  rounded'/>
              <Skeleton className='h-40 w-[100px]  rounded'/>
              <Skeleton className='h-40 w-[100px]  rounded'/>
              </div>}
          
        </div>
    </div>
    </div>
  )
}
