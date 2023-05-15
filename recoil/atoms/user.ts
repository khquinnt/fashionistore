import { atom } from 'recoil'
import { UserSchema } from '../../types/user'

export const userState = atom<UserSchema | null>({
	key: 'user-access-token',
	// default: {
	// 	_id: '',
	// 	accessToken: '',
	// 	address: [],
	// 	cart: [],
	// 	disabled: false,
	// 	email: '',
	// 	firstname: '',
	// 	lastname: '',
	// 	mobile: '',
	// 	role: '',
	// 	wishList: []
	// }
	default: null
})
