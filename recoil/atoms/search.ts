import { atom } from 'recoil'

export const searchOpenState = atom<boolean>({
	key: 'search-open',
	default: false
})
