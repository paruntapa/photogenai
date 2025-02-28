
import React from 'react'
import PackCard, { TPack } from './PackCard'
import { BACKEND_URL } from 'app/config'
import axios from 'axios'

async function getPacks(): Promise<TPack[]> {
    const res = await axios.get(`${BACKEND_URL}/pack/bulk`)
    return res.data.packs ?? []
}

export const Packs = async () => { 
    const packs = await getPacks()
  return (
    <div className=' rounded md:flex justify-between gap-3 '>
        {packs.map((p, idx) => <PackCard {...p} key={idx} />)}
    </div>
  )
}

export default Packs