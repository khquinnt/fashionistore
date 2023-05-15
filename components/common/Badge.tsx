import React, { ReactNode } from 'react'

type TypeBadge = 'category' | 'discount' | 'sold' | 'new'

type BadgeProps = {
	content?: string | undefined
	type: TypeBadge
}

function Badge({ type, content }: BadgeProps) {
	let styles = ''
	let children: string | undefined
	switch (type) {
		case 'category':
			styles = 'bg-black'
			children = content
			break
		case 'discount':
			styles = 'bg-primary'
			children = `- %${content}`
			break
		case 'sold':
		case 'new':
			styles = 'bg-primary'
			children = 'Sold'
			break

		default:
			break
	}
	return (
		<div
			className={`badge line-clamp-1 z-[1] top-2 left-2 lg:top-3 lg:left-3 absolute  py-1 px-2 md:py-2 md:px-3 text-white rounded text-xs md:text-[18px] ${styles}`}
		>
			{children}
		</div>
	)
}

export default Badge
