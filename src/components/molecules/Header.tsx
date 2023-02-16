import { HomeIcon, ShoppinCartIcon } from '@/assets/icons'
import Link from 'next/link'
import React from 'react'

export default function Header() {
  const store = 'Bruno`s shop'
  return (
    <div className='p-3 bg-orange-400 text-white'>
            <div className='flex items-center justify-between'>
              <Link href='/'>
                <HomeIcon width={30} color="white" />
              </Link>
              <h1 className='font-bold t'>
              {store.toUpperCase()} 
              </h1>
              <ShoppinCartIcon width={30} color="white" />
            </div>
    </div>

  )
}
