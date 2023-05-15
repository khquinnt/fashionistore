import React, { SVGProps } from 'react'

function EyeClose({
	fill = 'black',
	stroke = '',
	strokeWidth = '0.3',
	className = '',
	...svgProps
}: Partial<SVGProps<SVGSVGElement>>) {
	return (
		<svg
			width='22'
			height='18'
			viewBox='0 0 22 18'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			strokeWidth={1.5}
			stroke='currentColor'
			className={`w-6 h-6 ${className}`}
			{...svgProps}
		>
			<path
				d='M19.4 16.5L4.40002 1.5M9.20002 7.44157C8.82661 7.85326 8.60002 8.39403 8.60002 8.98631C8.60002 10.2761 9.67454 11.3217 11 11.3217C11.6112 11.3217 12.169 11.0994 12.5927 10.7334M19.4388 11.3217C20.265 10.0848 20.6 9.07613 20.6 9.07613C20.6 9.07613 18.4154 2.1 11 2.1C10.5837 2.1 10.1839 2.12199 9.80002 2.16349M16.4 14.3494C15.0226 15.2281 13.2494 15.8495 11 15.8127C3.67695 15.693 1.40002 9.07613 1.40002 9.07613C1.40002 9.07613 2.45788 5.69808 5.60002 3.64332'
				stroke='#707070'
				strokeWidth='1.5'
				strokeLinecap='round'
			/>
		</svg>
	)
}

export default EyeClose
