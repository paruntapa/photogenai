"use client"
import { useAuth } from '@clerk/nextjs'
import { BACKEND_URL } from 'app/config'
import axios from 'axios'
import { useEffect, useState } from 'react'
import ImageCard, { TImage } from './ImageCard'



const Camera = () => {
     const [images, setImages] = useState<TImage[]>([])
     const {getToken} = useAuth()

     useEffect(() => {
        (async ()=>{
            const token = await getToken()
            const response = await axios.get(`${BACKEND_URL}/image/bulk`, {
                headers: {
                  "Authorization": `Bearer ${token}`,
                },
              })
            setImages(response.data.images)
        })()
        
        }, [])
        {console.log(images)}

return (
    <div>
        {images.length === 0 && <div className='text-center'>Loading...</div>}
        {images.map((image, idx) => <ImageCard key={idx} {...image}/>)}
    </div>
)
}

export default Camera