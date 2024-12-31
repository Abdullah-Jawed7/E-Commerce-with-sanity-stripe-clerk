import React from "react";
import Container from "./container";
import Image from "next/image";
import logo from "../../../public/logo.png";
import Link from "next/link";
import { ShoppingBag, ShoppingBasket, User } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { ClerkLoaded, SignedIn, SignInButton, UserButton } from "@clerk/nextjs";
async function Header() {
    const user = await currentUser();
    console.log(user);
    
  return (
    <header className="sticky top-0 z-50 w-full bg-white py-4 border-b border-b-gray-400 ">
      <Container className="flex md:items-center justify-between gap-5 flex-col md:flex-row">
       <Link href={'/'}>
        <Image
          src={logo}
          alt="logo"
          className="w-24"
          priority
        ></Image>
       </Link>
        <form action={`/search`} className="flex-1 ">
          <input
            type="text"
            name="query"
            className="w-full border border-gray-400 px-4 
         py-2.5 rounded-md
          focus-visible:border-darkBlue outline-none"
            placeholder="Search for Products..."
          />
        </form>
        <div className="flex items-center gap-3 md:gap-5">
        <Link href={'/cart'}
   className='flex items-center text-xs md:text-sm gap-1 md:gap-2 border
    border-gray-200 px-2 py-1 rounded-md shadow-md 
    hover:shadow-none hoverEffect'
   >
    <ShoppingBag className='text-darkBlue w-4 h-4 md:w-6 md:h-6 '/>
    <div className="flex flex-col">
        <p className="text-xs">
            <span className='font-semibold'>0</span> items
        </p>
        <p className="font-semibold">Cart</p>
    </div>
   
   </Link>
   <ClerkLoaded>
    <SignedIn>
   <Link href={'/orders'}
   className='flex items-center text-xs md:text-sm gap-1 md:gap-2 border
    border-gray-200 px-2 py-1 rounded-md shadow-md 
    hover:shadow-none hoverEffect'
   >
    <ShoppingBasket className='text-darkBlue w-4 h-4 md:w-6 md:h-6 '/>
    <div className="flex flex-col">
        <p className="text-xs">
            <span className='font-semibold'>0</span> items
        </p>
        <p className="font-semibold">Order</p>
    </div>
   
   </Link>
    </SignedIn>
   {user ? (
    <div  className='flex items-center text-sm gap-2 border
    border-gray-200 px-2 py-1 rounded-md shadow-md 
    hover:shadow-none hoverEffect'>
<UserButton/>
<div className="hidden md:inline-flex flex-col">
        <p className="text-xs"> Welcome Back</p>
        <p className="font-semibold">{user?.fullName}</p>
    </div>
   </div>)
   :(<SignInButton mode='modal'>
     <div  className='flex items-center text-xs md:text-sm gap-1 md:gap-2 border
    border-gray-200 px-2 py-1 rounded-md shadow-md 
    hover:shadow-none hoverEffect'>
<User className="w-4 h-4 md:w-6 md:h-6 text-darkBlue"/>
<div className="flex flex-col">
        <p className="text-xs"> Account </p>
        <p className="font-semibold">Login</p>
    </div>
   </div>
   </SignInButton>)}
   </ClerkLoaded>
           
           <p></p>
        </div>
      </Container>
    </header>
  );
}

export default Header;
