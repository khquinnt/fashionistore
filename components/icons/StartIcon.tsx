import React, { SVGProps } from 'react'
import { IconType } from '../../types/icon'

function StartIcon({
	fill = 'transparent',
	stroke = 'black',
	strokeWidth = '1',
	classPath,
	...svgProps
}: IconType & Partial<SVGProps<SVGSVGElement>>) {
	return (
		<svg
			width='20'
			height='20'
			viewBox='-.5 -3 19 25'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...svgProps}
		>
			<path
				d='M17.9529 6.90409C17.8344 6.53961 17.5111 6.28156 17.1302 6.24709L11.9341 5.77536L9.88059 0.967661C9.72898 0.614445 9.384 0.386475 9.00002 0.386475C8.61605 0.386475 8.27093 0.614445 8.12028 0.967661L6.06676 5.77536L0.869868 6.24709C0.488911 6.28225 0.166319 6.54029 0.0471156 6.90409C-0.0714014 7.26856 0.0380517 7.66833 0.326173 7.92102L4.25399 11.3652L3.09587 16.4659C3.01114 16.841 3.15671 17.2288 3.4679 17.4537C3.63517 17.5753 3.83169 17.636 4.0289 17.636C4.19837 17.636 4.36797 17.5909 4.51945 17.5003L9.00002 14.8212L13.4798 17.5003C13.8084 17.6967 14.2216 17.6787 14.5321 17.4537C14.8433 17.2288 14.9889 16.841 14.9042 16.4659L13.7461 11.3652L17.6739 7.92102C17.9619 7.66833 18.0714 7.26939 17.9529 6.90409Z'
				fill={fill}
				stroke={stroke || fill}
				strokeWidth={strokeWidth}
				className={classPath}
			/>
		</svg>
	)
}

export default StartIcon
