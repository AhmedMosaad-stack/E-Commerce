import { ProductCategory, ProductBrand, ProductSubcategory } from './product';
export interface Cart {
  _id: string
  cartOwner: string
  products: CartProduct[]
  createdAt: string
  updatedAt: string
  __v: number
  totalCartPrice: number
}

export interface CartProduct {
  count: number
  _id: string
  product: CartProductDetails
  price: number
}

export interface CartProductDetails {
  subcategory: ProductSubcategory[]
  _id: string
  title: string
  quantity: number
  imageCover: string
  category: ProductCategory
  brand: ProductBrand
  ratingsAverage: number
  id: string
}

