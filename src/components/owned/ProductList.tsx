import React from 'react'
import { Category,Product } from '../../../sanity.types'
import Categories from './Categories';
import ProductCard from './ProductCard';
interface Props {
    products: Product[];
    categories:Category[];
    title?:boolean;
}
const ProductList = ({products,title, categories}:Props) => {
  return (
    <div>
      <Categories categories={categories}/>
      {title && 
      <div className="pb-5">
        <h2 className="text-2xl font-semibold text-gray-600">
            Day of the <span className="text-lightBlue">Deal</span>
        </h2>
        <p className="text-sm text-gray-500">
            Don&apos;t wait. the time will never be just right
        </p>
      </div>}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {
            products?.map((product)=> <ProductCard product={product} key={product._id}/> )
        }
      </div>
    </div>
  )
}

export default ProductList
