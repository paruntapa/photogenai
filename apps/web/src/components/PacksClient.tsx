"use client"
import React, { useState } from 'react'
import PackCard, { TPack } from './PackCard'
import { SelectModel } from './Models'

const PacksClient = ({packs}: {packs: TPack[]}) => {
    const [ selectedModelId, setSelectedModelId ] = useState<string>()
  return (
    <div className='grid grid-cols-1'>
    <div className='rounded md:flex  gap-3 '>
        <SelectModel selectedModel={selectedModelId} setSelectedModel={setSelectedModelId}/>
    </div>
    <div>
        <div className='text-2xl mb-4'> 
            Select Pack
        </div>
    <div className='rounded md:flex justify-between gap-3 '>
      {packs.map((p, idx) => <PackCard selectedModelId={selectedModelId!} {...p} key={idx} />)}
      </div>
    </div>
    </div>
  )
}

export default PacksClient