import React from 'react'
import { Skeleton } from './ui/skeleton'

export interface TImage {
    id: string
    status: string
    imageUrl: string
}

export const ImageCard = (props: TImage) => {
  return (
    <div className='bg-zinc-900 border rounded hover:border-primary w-fit '>
        <div className='flex p-2 gap-3 rounded '>
            { props.status === "Generated" ?<img className='rounded ' width="200" height="100" src={props.imageUrl} />: <Skeleton className='h-40 w-40'></Skeleton>}
        </div>
    </div>
  )
}

export const ImageCardSkeleton = () => {
    return (
        <div>
          <div>
            <Skeleton className='h-40'></Skeleton>
          </div>
        </div>
    )
}
