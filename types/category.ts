import { NameType } from './common'

export type CategorySchema = {
	children: []
	name: NameType
	slug: string
	_id: string
	images: { url: string }[]
}
