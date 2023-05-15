import { SVGProps } from 'react'

function CheckIcon({
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
				d='M20 7L9.00004 18L3.99994 13'
				stroke={stroke}
				strokeWidth={strokeWidth}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

export default CheckIcon
