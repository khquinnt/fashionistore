import { ProductSchema } from './product'

export type LoginValueType = {
	email: string
	password: string
	remember: boolean
}

export type AttributeSetCart = {
	key: string
	value: string
	quantity: number
}

export type CartSchema = {
	orderBy: string
	products: {
		product: ProductSchema
		attributeSet: AttributeSetCart[]
		quantity: number
		price: number
		total: number
	}[]
	subTotal: number
	_id: string
	createdAt: Date
	updatedAt: Date
}

export type UserSchema = {
	_id: string
	accessToken: string
	address: []
	cart: CartSchema | null
	disabled: boolean
	email: string
	firstname: string
	lastname: string
	mobile: string
	role: string
	wishList: string[]
}

export type RegisterValueType = {
	email: string
	firstname: string
	lastname: string
	password: string
	mobile: string
}
