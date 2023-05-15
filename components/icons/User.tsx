import React, { SVGProps } from 'react'

function UserIcon({
	fill = '',
	stroke = '#000001',
	strokeWidth = '.5',
	className = '',
	...svgProps
}: Partial<SVGProps<SVGSVGElement>>) {
	return (
		<svg
			width='14'
			height='14'
			viewBox='0 0 14 14'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className={`w-6 h-6 stroke-black ${className}`}
			{...svgProps}
		>
			<path
				d='M7 7C8.79493 7 10.25 5.54493 10.25 3.75C10.25 1.95507 8.79493 0.5 7 0.5C5.20507 0.5 3.75 1.95507 3.75 3.75C3.75 5.54493 5.20507 7 7 7Z'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M13.18 13.4999C12.7602 12.1907 11.9355 11.0487 10.8248 10.2385C9.7141 9.42828 8.37481 8.9917 7.00001 8.9917C5.6252 8.9917 4.28591 9.42828 3.17522 10.2385C2.06453 11.0487 1.23983 12.1907 0.820007 13.4999H13.18Z'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

export default UserIcon
