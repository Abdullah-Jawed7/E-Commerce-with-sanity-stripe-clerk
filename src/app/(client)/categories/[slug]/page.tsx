
import Container from '@/components/owned/container';
import ProductCard from '@/components/owned/ProductCard';
import ProductList from '@/components/owned/ProductList';
import { getAllCategories, getProductByCategory } from '@/sanity/helpers';
interface Props {
    params:Promise<{slug:string}>
}
const CategoryPage = async ({params}:Props) => {
  const {slug} = await params;
  const products = await getProductByCategory(slug)
  const categories = await getAllCategories();
 
  return(
    <div className="flex flex-col items-center bg-gray-100 ">
      <Container className='p-8 bg-white rounded-lg shadow-md mt-3 w-full'>
        <h1 className='text-2xl md:text-3xl font-bold'>
          Search results for&nbsp;
          <span className='text-darkBlue'>{
          slug.split('-').map((word)=>word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
          } </span> collection
        </h1>
        <ProductList products={products} categories={categories} title={false}/>

      </Container>
    </div>
  )
//   if (!products?.length) {
//     return(
//         <div className="flex  justify-center min-h-screen bg-gray-100 p-4">
//             <div className="h-44 sm:h-36 bg-white p-8 rounded-lg shadow-md w-full md:max-w-4xl text-center">
//                 <h1 className="text-3xl font-bold mb-3">
//                     No products found for&nbsp;
//                      <span className="text-darkBlue">{ slug}</span>
//                 </h1>
//                 <p className="text-gray-600">try searching with different keywords</p>
//             </div>
//         </div>
//     )
// }

// return (
// <div className='flex flex-col items-center justify-between min-h-screen bg-gray-100'>
// <Container className='m-2 sm:m-8 sm:p-8 bg-white rounded-lg shadow-md mt-3 '>
// <h1 className="text-center  text-3xl font-bold mb-5">
//                     Search results for&nbsp;
//                      <span className="text-darkBlue">{ slug}</span>
//                 </h1>
// <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
//     {
//         products?.map((product)=> <ProductCard product={product} key={product._id}/> )
//     }
//   </div>

// </Container>
// </div>
// )
}

export default CategoryPage
