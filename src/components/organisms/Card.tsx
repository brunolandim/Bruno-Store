import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Button from '../atoms/Button'

type ProductCard = {
    name: string
    shortDescription: string
    image: string
    alt: string
    id:string
}

export default function Card({ name, image, alt, id }: ProductCard) {
  return (
    <div className='p-4 flex flex-col md:flex-row md:flex-wrap text-center shadow-xl rounded-lg hover:'>
      <div className="w-full md:w-72 h-auto md:mr-4">
        <h2>{name}</h2>
        <Image className='m-auto' width={150} height={200} src={image} alt={alt} />
        <hr className='my-2' />
        <Link href={`/products/${id}`}>
        <Button
          css='bg-orange-500 hover:bg-orange-700 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded-full'
          text='Saiba mais' />
        </Link>
    
      </div>
    </div>

  )
}
