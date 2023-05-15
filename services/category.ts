import axios from 'axios'
import { CategorySchema } from '../types/category'

const endpoint = '/categories'

export const getAllCategories = async (): Promise<CategorySchema[]> => {
	return axios.get(`${endpoint}`)
}
