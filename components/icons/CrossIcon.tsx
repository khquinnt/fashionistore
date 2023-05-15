import { SVGProps } from 'react'

function CrossIcon({
	className = '',
	strokeWidth = '1.5',
	stroke = '#001A72',
	...svgProps
}: Partial<SVGProps<SVGSVGElement>>) {
	return (
		<svg
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...svgProps}
			className={`${className}`}
		>
			<path
				d='M16 8L8 16M8.00001 8L16 16'
				stroke={stroke}
				strokeWidth={strokeWidth}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

export default CrossIcon
