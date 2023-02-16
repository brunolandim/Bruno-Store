import Image from 'next/image';
import { useRouter } from 'next/router'
import products from '@/provider/products.json'
import React, { useEffect, useMemo, useState } from 'react'
import { Product } from '../types/Product';

export default function ProductId() {
  const [dataProduct, setDataProduct] = useState<Product[]>([]);

  const router = useRouter()
  const { id } = router.query

  const productItem = useMemo(() => {
    return dataProduct.find((product) => product.id === id)
  },[dataProduct,id])

  useEffect(() => {
    setDataProduct(products.data.nodes)
  },[]);

  if (!productItem) {
    return <h1>Carregando...</h1>
  }
  return (
    <div className='font-mono flex flex-col p-5 m-auto shadow-md justify-center items-center text-center'>
        <h1 className='text-[2.0rem]'>{productItem.name}</h1>
        <h2>Categoria: {productItem.category.name}</h2>
        <Image
            className=''
            width={600} 
            height={600}
            src={`${productItem?.images[0].asset.url}`}
            alt={`${productItem?.images[0].alt}`}
            />
            <p>{productItem?.shortDescription}</p>
    </div>
  )
}
