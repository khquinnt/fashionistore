import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { logout, refreshToken } from '../services/user'

const isServer = typeof window === 'undefined'

export const initiateAxios = () => {
	axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL_API
	axios.defaults.timeout = 60000
	// axios.defaults.withCredentials = true

	if (!isServer) {
		axios.interceptors.request.use(
			async function (config: AxiosRequestConfig) {
				let token = localStorage.getItem('guestToken')

				if (token && config.headers) {
					config.headers['Authorization'] = `Bearer ${token}`
				}

				return config
			},
			async (error: AxiosError) => {
				return error
			}
		)

		axios.interceptors.response.use(
			async (res: AxiosResponse) => {
				return res.data
			},

			async (error: AxiosError | Error) => {
				if (axios.isAxiosError(error)) {
					if (error.response?.data.message === 'Refresh token expired') {
						await logout()
						location.replace('/login')
					} else if (error.response?.status === 401) {
						const RF_TOKEN = 'refreshToken'
						let rfToken = document.cookie.split(`${RF_TOKEN}=`)[1]
						let token = localStorage.getItem('guestToken')

						if (rfToken && token) {
							try {
								const newToken = await refreshToken()
								localStorage.setItem('guestToken', newToken.accessToken)

								if (error.config?.headers) {
									error!.config.headers[
										'Authorization'
									] = `Bearer ${newToken.accessToken}`

									return axios(error.config)
								}
							} catch (error) {
								console.log('ERROR REFRESH TOKEN: ', error)
							}
						}
					}
					return Promise.reject(error.response || error.message)
				} else {
					return Promise.reject(error)
				}
			}
		)
	}
}
