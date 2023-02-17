import React, { useEffect, useMemo, useState } from 'react'
import products from '@/provider/products.json'
import Card from '../organisms/Card';
import type { Product } from '../types/Product';
import { SearchIcon } from '@/assets/icons';


export default function ProductsPage() {
  const [dataProduct, setDataProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search , setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  

  useEffect(() => {
    setDataProduct(products.data.nodes)
    setLoading(false)
  }, []);

  const handleCategoryChange = (categoryName: string) => {
    const newSelectedCategories = selectedCategories.includes(categoryName)
      ? selectedCategories.filter((category) => category !== categoryName)
      : [...selectedCategories, categoryName];
    setSelectedCategories(newSelectedCategories);
  };
  const filteredProducts = useMemo<Product[]>(() => {
    let products:Product[] = dataProduct
    if (search.length > 0) {
      products = products.filter((product) => product.name.includes(search))
    }
   if(selectedCategories.length > 0 ) {
     products = products.filter((product) => selectedCategories.includes(product.category.name))
   }
   return products;
  },[dataProduct,search,selectedCategories])

  if (loading) {
    return <p>Carregando...</p>
  }
  return (
    <div className="font-mono p-5">
      <div className="bg-white flex flex-row border shadow-md rounded-3xl items-center p-2 my-5 max-w-4xl md:m-auto">
        <SearchIcon className="ml-2 sm:m-auto" width={25} color="purple" />
        <input 
          className="flex-grow outline-none ml-2 font-sans" 
          placeholder="Busque um produto" 
          type="text"
          onChange={e => setSearch(e.target.value)}
          value={search}
        />
      </div>

      <div className='flex flex-row py-5'>

      <div className='flex flex-row'>
        <div className='flex flex-col'>
          <h1 className='font-bold'>Filtros</h1>
          <hr />
          {dataProduct.reduce<string[]>((categories, product) => {
            if (product.category && !categories.includes(product.category.name)) {
              return [...categories, product.category.name];
            }
            return categories;
          }, []).map((categoryName) => (
            <div className='items-center mt-2' key={categoryName}>
              <label className='flex items-center my-2' key={categoryName}>
                <input
                  type='checkbox'
                  checked={selectedCategories.includes(categoryName)}
                  onChange={() => handleCategoryChange(categoryName)}
                />

                <span className='md:w-40 mx-2'>{categoryName}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h1 className='text-center font-bold'>Produtos Encontrados: {filteredProducts.length}</h1>
        <hr />
        <div className="flex flex-col md:flex-row flex-wrap gap-7 justify-center">
          {filteredProducts.map((product) => (
                  <Card 
                    key={product.id}
                    name={product.name}
                    image={product.images[0].asset?.url}
                    alt={product.images[0].alt}
                    shortDescription={product.shortDescription}
                    id={product.id}
                  />
              ))
          }
        </div>
      </div>
      </div>
    </div>
  )
}
