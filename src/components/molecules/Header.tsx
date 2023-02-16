import { HomeIcon } from '@/assets/icons'
import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <div className='p-3 bg-orange-400 text-white'>
        <Link href='/'>
            <div className='flex items-center'>
                <HomeIcon  width={30} color="white"/>
                <h1 className='font-bold mx-2'>
                Bruno`s shop 
                </h1>
            </div>
        </Link>
    </div>

  )
}
