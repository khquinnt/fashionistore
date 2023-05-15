import { LoginValueType, RegisterValueType, UserSchema } from './../types/user'
import axios from 'axios'

const endpoint = '/auth'

export const register = async (payload: RegisterValueType) => {
	return axios.post(`${endpoint}/register`, payload)
}

export const login = async (payload: LoginValueType): Promise<UserSchema> => {
	return axios.post(`${endpoint}/login`, payload)
}
