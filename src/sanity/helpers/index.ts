import { sanityFetch } from "../lib/live";
import { CATEGORY_QUERY, PRODUCT_BY_CATEGORY_QUERY, PRODUCT_BY_SLUG_QUERY, PRODUCT_QUERY, PRODUCT_SEARCH_QUERY, SALE_QUERY } from "./queries";

export const getSale = async()=>{
    try {
        const products = await sanityFetch(
            {
                query:SALE_QUERY
            }
        )
        return products?.data || [];
    } catch (error) {
        console.error("Error Fetching Sale",error);
        return[];

    }
}

export const getAllProducts = async()=>{
    try {
        const products = await sanityFetch(
            {
                query:PRODUCT_QUERY
            }
        )
        return products?.data || [];
    } catch (error) {
        console.error("Error Fetching All Products",error);
        return[];

    }
}

export const getAllCategories = async()=>{
    try {
        const products = await sanityFetch(
            {
                query:CATEGORY_QUERY
            }
        )
        return products?.data || [];
    } catch (error) {
        console.error("Error Fetching All Products",error);
        return[];

    }
}

export const getProductBySlug = async(slug:string)=>{
    try {
        const products = await sanityFetch(
            {
                query:PRODUCT_BY_SLUG_QUERY,
                params:{
                    slug,
                }
            }
        )
        return products?.data || null;
    } catch (error) {
        console.error(`Error Fetching ${slug} Products`,error);
        return null;

    }
}

export const getProductBySearch = async(searchParam:string)=>{
    try {
        const products = await sanityFetch(
            {
                query:PRODUCT_SEARCH_QUERY,
                params:{
                    searchParam:searchParam
                }
            }
        )
        return products?.data || [];
    } catch (error) {
        console.error(`Error Fetching while searching ${searchParam} Products`,error);
        return [];

    }
}

export const getProductByCategory = async(categorySlug:string)=>{
    try {
        const products = await sanityFetch(
            {
                query:PRODUCT_BY_CATEGORY_QUERY,
                params:{
                    categorySlug,
                }
            }
        )
        return products?.data || [];
    } catch (error) {
        console.error(`Error Fetching Category ${categorySlug} Products`,error);
        return [];

    }
}

