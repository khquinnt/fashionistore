import axios from 'axios'
import { NameType } from '../types/common'
import { AttributeSetCart, CartSchema } from '../types/user'

const endpoint = '/users'

export const refreshToken = async (): Promise<{ accessToken: string }> => {
	return axios.get(`${endpoint}/refresh`)
}

export const logout = async (): Promise<{ message: NameType }> => {
	return axios.get(`${endpoint}/logout`)
}

export const addToWishList = async (
	proId: string
): Promise<{ message: NameType; data: [] }> => {
	return axios.put(`${endpoint}/wish-list/${proId}`)
}

export const removeFromWishList = async (
	proId: string
): Promise<{ message: NameType; data: [] }> => {
	return axios.delete(`${endpoint}/wish-list/${proId}`)
}

export const addToCart = async (
	proId: string,
	value: {
		quantity: number
		price: number
		attribute: AttributeSetCart[]
	},
	replaceQuantity?: boolean
): Promise<{ cart: CartSchema }> => {
	const query = replaceQuantity ? '?replaceQuantity=true' : ''
	return axios.put(`${endpoint}/add-to-cart/${proId}${query}`, value)
}

export const getCart = async (): Promise<{ cart: CartSchema }> => {
	return axios.get(`${endpoint}/cart`)
}
