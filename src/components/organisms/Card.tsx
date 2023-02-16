import Image from 'next/image'
import React from 'react'
import Button from '../atoms/Button'

type ProductCard = {
    name: string
    shortDescription: string
    image: string
    alt: string
}

export default function Card({ name, image, alt }: ProductCard) {
  return (
    <div className='p-4 flex flex-col md:flex-row md:flex-wrap text-center shadow-xl'>
      <div className="rounded-xl w-full md:w-72 h-auto md:mr-4">
        <h2>{name}</h2>
        <Image className='m-auto' width={150} height={200} src={image} alt={alt} />
        <hr className='my-2' />
        <Button
          css='text-white border mt-2 px-3 py-1 rounded-2xl bg-orange-500'
          text='Saiba mais' />
      </div>
    </div>

  )
}
