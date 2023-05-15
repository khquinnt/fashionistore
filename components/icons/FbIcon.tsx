import React, { SVGProps } from 'react'
import { IconType } from '../../types/icon'

function FbIcon({
	fill = 'black',
	stroke = '',
	strokeWidth = '0.3',
	classPath,
	...svgProps
}: IconType & Partial<SVGProps<SVGSVGElement>>) {
	return (
		<svg
			width='7'
			height='12'
			viewBox='0 0 7 12'
			fill='none'
			{...svgProps}
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M6.33333 2H4.33333C3.96514 2 3.66667 2.29848 3.66667 2.66667V4.66667H6.33333C6.40916 4.66498 6.48107 4.70026 6.52615 4.76125C6.57123 4.82224 6.58385 4.90134 6.56 4.97333L6.06667 6.44C6.0212 6.57461 5.89541 6.66561 5.75333 6.66667H3.66667V11.6667C3.66667 11.8508 3.51743 12 3.33333 12H1.66667C1.48257 12 1.33333 11.8508 1.33333 11.6667V6.66667H0.333333C0.149238 6.66667 0 6.51743 0 6.33333V5C0 4.81591 0.149238 4.66667 0.333333 4.66667H1.33333V2.66667C1.33333 1.19391 2.52724 0 4 0H6.33333C6.51743 0 6.66667 0.149238 6.66667 0.333333V1.66667C6.66667 1.85076 6.51743 2 6.33333 2Z'
				fill={fill}
				stroke={stroke || fill}
				strokeWidth={strokeWidth}
				className={classPath}
			/>
		</svg>
	)
}

export default FbIcon
