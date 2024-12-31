import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const ProductType = defineType({
    name: "product",
    title: "Product",
    type: "document",
    icon: TrolleyIcon,
    fields:[
        defineField({
            name: "name",
            title: "Product Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name:"slug",
            title: "Slug",
            type: "slug",
            validation: (Rule) => Rule.required(),
            options:{
                source: "name",
                maxLength: 96,
            }
        }),
        defineField({
            name:'image',
            title: 'Product Image',
            type: 'image',
            validation: (Rule) => Rule.required(),
            options: {
                hotspot: true,
            },


        }),
        defineField({
            name: "description",
            title: "Product Description",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "price",
            title: "Product Price",
            type: "number",
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: "discount",
            title: "Discount",
            type: "number",
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name:'categories',
            title: 'Categories',
            type: 'array',
            of: [{type: 'reference', to: {type: 'category'}}],
        }),
        defineField({
            name: "stock",
            title: "Stock",
            type: "number",
            validation: (Rule) => Rule.min(0),
        }),
        defineField({
            name: "label",
            title: "Label",
            type: "string",
            validation: (Rule) => Rule.min(0),
        }),
        defineField({
            name: "status",
            title: "Product Status",
            type: "string",
            options: {
                list: [
                    {title: "New", value: "new"},
                    {title: "Hot", value: "hot"},
                    {title: "Sale", value: "sale"},
                ],
            },
        }),

    ],
    preview:{
        select:{
            title: 'name',
            media: 'image',
            subtitle: 'price',
        },
        prepare(selection){
            return{
                title: selection.title,
                media: selection.media,
                subtitle: `$${selection.subtitle}`,
            }
        }
    }
})