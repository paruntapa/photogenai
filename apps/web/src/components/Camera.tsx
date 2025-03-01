"use client"
import { useAuth } from '@clerk/nextjs'
import { BACKEND_URL } from 'app/config'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { ImageCard, ImageCardSkeleton, TImage } from './ImageCard'



const Camera = () => {
     const [images, setImages] = useState<TImage[]>([])
     const [imageloading, setImageLoading] = useState(false) 
     const {getToken} = useAuth()

     useEffect(() => {
        (async ()=>{
            setImageLoading(true)
            const token = await getToken()
            const response = await axios.get(`${BACKEND_URL}/image/bulk`, {
                headers: {
                  "Authorization": `Bearer ${token}`,
                },
              })
            setImages(response.data.images)
            setImageLoading(false)
        })()
        
        }, [])
return (
    <div className='grid md:grid-cols-3 grid-cols-1  '>
        {imageloading && <ImageCardSkeleton ></ImageCardSkeleton>}
        {images.map((image, idx) => <ImageCard key={idx} {...image}/>)}
    </div>
)
}

export default Camera