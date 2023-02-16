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
  const filteredProducts = useMemo<Product[]>(() =>{
    let products:Product[] = dataProduct
    if (search.length > 0) {
      products = products.filter((product) => product.name.includes(search))
    }
   if(selectedCategories.length > 0 ) {
     products = products.filter((product) =>selectedCategories.includes(product.category.name))
   }
   return products;
  },[dataProduct,search,selectedCategories])

  if (loading) {
    return <p>Carregando...</p>
  }
  return (
    <div className="font-mono p-5">
      <div className="bg-white flex flex-row border shadow-md rounded-3xl items-center p-2 my-5 max-w-4xl md:m-auto">
        <SearchIcon className="ml-2 sm:m-auto" width={25} color="orange" />
        <input 
          className="flex-grow outline-none ml-2 font-sans" 
          placeholder="Busque um produto" 
          type="text"
          onChange={e => setSearch(e.target.value)}
          value={search}
        />
      </div>

      <div className='py-5 flex flex-col md:flex-row flex-wrap'>
        {dataProduct.reduce<string[]>((categories, product) => {
          if (product.category && !categories.includes(product.category.name)) {
            return [...categories, product.category.name];
          }
          return categories;
        }, []).map((categoryName) => (
          <label key={categoryName} className='mx-5 '>
            <input
            className='mx-2'
              type="checkbox"
              checked={selectedCategories.includes(categoryName)}
              onChange={() => handleCategoryChange(categoryName)}
            />
            {categoryName}
          </label>
        ))}
      </div>
      <hr className='my-5'/>
      <div>
        <div className="flex flex-col md:flex-row flex-wrap gap-7 justify-center">
          {filteredProducts.map((product) => (
                <div className='hover:-translate-y-1 transition duration-200' key={product.id}>
                  <Card 
                    name={product.name}
                    image={product.images[0].asset?.url}
                    alt={product.images[0].alt}
                    shortDescription={product.shortDescription}
                    id={product.id}
                  />
                </div>
              ))
          }
        </div>
      </div>
    </div>
  )
}
