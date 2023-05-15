import { SVGProps } from 'react'

function InforIcon({
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
				d='M12 5.00999L12 5M12 19L12 7.99998'
				stroke={stroke}
				strokeWidth={strokeWidth}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

export default InforIcon
