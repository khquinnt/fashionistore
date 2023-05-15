import { UserSchema } from './user'
import { CategorySchema } from './category'
import { NameType } from './common'

export type RatingType = {
	star: number
	comment: string
	postedBy: UserSchema
}

export type AttributeListType = {
	key: string
	value: string[]
	quantity: number[]
	sold: number[]
}

export type BrandType = {
	name: string
	slug: string
	_id: string
}

export type SpecialPriceType = {
	price: number
	start_date?: Date
	end_date?: Date
}

export type ProductSchema = {
	attributeSet: AttributeListType[]
	brand: BrandType
	category: CategorySchema[]
	createdAt: string
	description: NameType
	enabled: boolean
	images: { url: string }[]
	name: NameType
	original_price: number
	quantity: number
	rating: RatingType[]
	slug: string
	sold: number
	special_price: SpecialPriceType
	status: string
	updatedAt: string
	_id: string
	shortDesc: string
}

export type AttributeSchema = {
	value: string
	quantity: number
	active?: boolean
}

// Pick<T, K in T>
// Ví dụ ProductSchem, mình muốn tạo 1 productListSchema với những key đã có sẵn trong ProductSchema thì mình dùng Pick (Ví dụ muốn lấy id, name, brand, category)
// const ProductListSchema = Pick<ProductSchema, "id" | "name" | "brand" | "category">[]
