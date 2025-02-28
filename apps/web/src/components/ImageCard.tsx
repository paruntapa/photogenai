import React from 'react'

export interface TImage {
    id: string
    status: string
    imageUrl: string
}

const ImageCard = (props: TImage) => {
  return (
    <div className='bg-zinc-900 border rounded hover:border-primary w-fit '>
        <div className='flex p-2 gap-3 rounded '>
            <img className='rounded ' width="200" height="100" src={props.imageUrl} />
        </div>
    </div>
  )
}

export default ImageCard