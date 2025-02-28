import React from 'react'

export interface TPack {
    name: string
    imageUrl1: string
    imageUrl2: string
    description: string
}

const PackCard = (props: TPack) => {
  return (
    <div className='bg-zinc-900 border rounded hover:border-primary w-fit '>
        <div className='sm:w-full p-5 mr-5 flex gap-3 rounded '>
            <img className='rounded ' width="50%" src={props.imageUrl1} alt={props.name} />
            <img className='rounded ' width="50%" src={props.imageUrl2} alt={props.name} />
        </div>

        <div className='text-md m-3'>
            {props.name}
        </div>

        <div className='text-sm m-3'>
            {props.description}
        </div>
    </div>
  )
}

export default PackCard