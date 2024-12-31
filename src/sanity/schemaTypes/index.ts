import { type SchemaTypeDefinition } from 'sanity'
import {categoryType} from './categoryType'
import { saleType } from './saleType'
import { ProductType } from './productType'
import { orderType } from './orderType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ categoryType,saleType , ProductType , orderType],
}
