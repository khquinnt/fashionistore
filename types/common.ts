export type NameType = {
	en: string
	vi: string
}

export enum LangEnum {
	en = 'en',
	vi = 'vi'
}

export type ToastStatusType = 'check' | 'error' | 'infor' | 'warning'
export type ErrorDataType = {
	data: string
	message: { en: string; vi: string }
}

export type ToastType = {
	message: string
	type: ToastStatusType
	id: string
}

export type PagingType = {
	currentPage: number
	limit: number
	total: number
	totalPages: number
}
