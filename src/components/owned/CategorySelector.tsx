'use client'
import React, { useState } from 'react'
import { Category } from '../../../sanity.types'

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command'
import { cn } from '@/lib/utils'

const CategorySelector = ({categories}:{categories:Category[]}) => {
    const [open ,setOpen] = useState(false)
    const [value ,setValue] = useState('')
    const router = useRouter()
  return (
   <Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger asChild>
        <Button 
        variant={'outline'}
        role='combobox'
        aria-expanded={open}
        className='w-[200px] justify-between'
        >
            {value ? categories.find((category)=>category._id === value)?.title : 'Filter by Category'}
            <ChevronsUpDown/>
        </Button>
    </PopoverTrigger>
    <PopoverContent className='w-[200px] p-0'>
        <Command className='' >
            <CommandInput 
            placeholder='Search Category...'
            className='h-9' 
            onKeyDown={(e)=>{
                if (e.key === 'Enter') {
                    const selectedCategory = categories.find((c)=>c.title?.toLowerCase().includes(e.currentTarget.value.toLowerCase()))
                     if (selectedCategory?.slug?.current) {
                        setValue(selectedCategory?._id)
                        router.push(`/categories/${selectedCategory?.slug?.current}`)
                        setOpen(false)  
                     }
                } 
            }}/>
            <CommandList>
                <CommandEmpty>No Category Found...</CommandEmpty>
                <CommandGroup>
                    {categories?.map((category)=>(
                        <CommandItem
                         key={category?._id} 
                         value={category?.title}
                         onSelect={()=>{
                            setValue(value == category?._id ?category?._id:'')
                            router.push(`/categories/${category?.slug?.current}`)
                            setOpen(false)
                         }}>
                            {category?.title}
                            <Check className={cn('ml-auto', value == category?._id ? "opacity-100" : 'opacity-0')}/>
                            
                            </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    </PopoverContent>

   </Popover>
  )
}

export default CategorySelector
