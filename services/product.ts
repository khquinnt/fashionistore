import axios from 'axios'
import { AddReviewType } from '../components/page/ProductDetail/Review'
import { PagingType } from '../types/common'
import { ProductSchema } from '../types/product'
import { RatingType } from './../types/product'

const endpoint = '/products'

export const newestProduct = async (): Promise<ProductSchema[]> => {
	return axios.get(`${endpoint}/newest`)
}

export const getAllProduct = async (
	limit: number = 10,
	page: number = 1
): Promise<{ data: ProductSchema[]; pagination: PagingType }> => {
	return axios
		.get(`${endpoint}?page=${page}&limit=${limit}`)
		.then((res) => res.data)
}

export const getDetailProduct = async (
	slug: string
): Promise<ProductSchema> => {
	return axios.get(`${endpoint}/${slug}`).then((res) => res.data)
}

export const getRelatedProduct = async (
	slug: string
): Promise<ProductSchema[]> => {
	return axios.get(`${endpoint}/${slug}/related`).then((res) => res.data)
}

export const getHostedProduct = async (): Promise<ProductSchema[]> => {
	return axios.get(`${endpoint}/most-sold`)
}

export const addReview = async (
	id: string,
	body: AddReviewType
): Promise<RatingType[]> => {
	return axios.post(`${endpoint}/review/${id}`, body)
}
