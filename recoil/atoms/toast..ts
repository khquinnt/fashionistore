import { atom } from 'recoil'
import { ToastType } from '../../types/common'

export const toastState = atom<ToastType[]>({
	key: 'toast-open',
	default: []
})
