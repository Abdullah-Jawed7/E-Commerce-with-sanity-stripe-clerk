"use client";

import React, { useEffect, useState } from "react";
import { Product } from "../../../sanity.types";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import QuantityBtn from "./QuantityBtn";
import PriceFormatter from "./PriceFormatter";

interface Props {
  product: Product;
  className?: string;
}
const AddToCartBtn = ({ product, className }: Props) => {
const [isClient ,setIsClient] = useState(false);
useEffect(()=>{
  setIsClient(true);
},[])
if(!isClient)return null



  const handleAddToCart = () => {
    toast.success("Product added SuccessFully");
  };
  const itemCount = 0;
  return (
    <div>
      {itemCount ? (
       <div className="text-sm">
        <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Quantity</span>
        <QuantityBtn product={product}/>
        </div>
        <div className="flex items-center justify-between border-t pt-1">
            <span>
                Subtotal
            </span>
            <PriceFormatter amount={product?.price ? product?.price * itemCount : 0}/>
        </div>
       </div>
      ) : (
        <Button
          onClick={handleAddToCart}
          className={cn(
            "bg-darkBlue/10 text-black border-darkBlue border py-2 mt-2 w-full rounded-md font-medium hover:bg-darkBlue hover:text-white group-hoverEffect disabled:hover:cursor-not-allowed disabled:bg-darkBlue/10 disabled:text-gray-400 disabled:hover:text-gray-400 disabled:border-darkBlue/10",
            className
          )}
        >
          Add to Cart
        </Button>
      )}
    </div>
  );
};

export default AddToCartBtn;
