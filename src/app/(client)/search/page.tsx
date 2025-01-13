import Container from '@/components/owned/container';
import ProductCard from '@/components/owned/ProductCard';
import { getProductBySearch } from '@/sanity/helpers';
import React from 'react'
// interface Props {
//     searchParams:Promise<{
//         query:string
//     }>
// }
const SearchPage = async ({searchParams}:{searchParams:Promise<{query:string}>}) => {
    const {query } = await searchParams;
    const products = await getProductBySearch(query)
    
    if (!products?.length) {
        return(
            <div className="flex  justify-center min-h-screen bg-gray-100 p-4">
                <div className="h-44 sm:h-36 bg-white p-8 rounded-lg shadow-md w-full md:max-w-4xl text-center">
                    <h1 className="text-3xl font-bold mb-3">
                        No products found for&nbsp;
                         <span className="text-darkBlue">{ query}</span>
                    </h1>
                    <p className="text-gray-600">try searching with different keywords</p>
                </div>
            </div>
        )
    }
    
  return (
    <div className='flex flex-col items-center justify-between min-h-screen bg-gray-100'>
    <Container className='m-2 sm:m-8 sm:p-8 bg-white rounded-lg shadow-md mt-3 '>
    <h1 className="text-center  text-3xl font-bold mb-5">
                        Search results for&nbsp;
                         <span className="text-darkBlue">{ query}</span>
                    </h1>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {
            products?.map((product)=> <ProductCard product={product} key={product._id}/> )
        }
      </div>

    </Container>
    </div>
  )
}

export default SearchPage
