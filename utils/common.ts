import { AttributeListType } from '../types/product'

export const thumbnailPlaceholderUrl = `https://res.cloudinary.com/dwp3jwbra/image/upload/v1676369549/rcmred2osoojfbrsu4bt.png`

export function getTotalQuantity(attributeSet: AttributeListType[]) {
	if (!attributeSet) return 0
	return attributeSet.reduce((pre, current) => {
		const attrQuantity = current.quantity
		const quantity = attrQuantity.reduce((p, quanCurrent) => p + quanCurrent, 0)
		const total = pre + quantity
		return total
	}, 0)
}

export function shimmer(w: number, h: number) {
	return `
	<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
		<defs>
			<linearGradient id="g">
				<stop stop-color="#333" offset="20%" />
				<stop stop-color="#222" offset="50%" />
				<stop stop-color="#333" offset="70%" />
			</linearGradient>
		</defs>
		<rect width="${w}" height="${h}" fill="#333" />
		<rect id="r" width="${w}" height="${h}" fill="url(#g)" />
		<animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
	</svg>
	`
}

export function toBase64(str: string) {
	return typeof window === 'undefined'
		? Buffer.from(str).toString('base64')
		: window.btoa(str)
}
