import { atom } from 'recoil'

export const loadingOpenState = atom<boolean>({
	key: 'loading-open',
	default: false
})
