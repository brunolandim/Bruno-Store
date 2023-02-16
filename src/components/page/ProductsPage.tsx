import React, { useEffect, useState } from 'react'
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
  const filteredProducts = search.length > 0
  ? dataProduct.filter((product) => product.name.includes(search))
  : selectedCategories.length > 0
    ? dataProduct.filter((product) =>
      selectedCategories.includes(product.category.name)
      )
    : dataProduct;

  if (loading) {
    return <p>Carregando...</p>
  }
  return (
    <div className="font-mono p-5">
      <div className="flex flex-row border shadow-md rounded-3xl items-center p-2 my-5 max-w-4xl md:m-auto">
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
          if (product.category.name && !categories.includes(product.category.name)) {
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
        <div className="flex flex-col md:flex-row flex-wrap gap-7">
          {search.length > 0 
            ? filteredProducts.map((product) => (
                <div key={product.id}>
                  <Card 
                    name={product.name}
                    image={product.images[0].asset?.url}
                    alt={product.images[0].alt}
                    shortDescription={product.shortDescription}
                  />
                </div>
              ))
            : dataProduct.map((product) => (
              <div key={product.id}>
                <Card 
                  key={product.id}
                  name={product.name}
                  image={product.images[0].asset?.url}
                  alt={product.images[0].alt}
                  shortDescription={product.shortDescription}
                />
                </div>
              ))
          }
        </div>
      </div>
    </div>
  )
}
