import Container from "@/components/owned/container";
import DiscountBanner from "@/components/owned/DiscountBanner";
import ProductList from "@/components/owned/ProductList";
import { getAllCategories, getAllProducts, getSale } from "@/sanity/helpers";

export default async function Home() {
  const sales = await getSale();
  const products =  await getAllProducts();
  const categories = await getAllCategories();

  
  return (
   <>
<Container>
   <DiscountBanner sales={sales}/>
   <ProductList products={products} categories={categories} title={true}/>
</Container>
   {/*
    Part: 7 
    Time: 0 minutes
   */}
   </>
  );
}
