import React, { SVGProps } from 'react'
import { IconType } from '../../types/icon'

function HeartIcon({
	fill = 'transparent',
	stroke = 'black',
	strokeWidth = '1.4',
	classPath,
	...svgProps
}: IconType & Partial<SVGProps<SVGSVGElement>>) {
	return (
		<svg
			width='22'
			height='19'
			viewBox='0 0 21 17'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...svgProps}
		>
			<path
				d='M9.86508 2.88348L10 3.16121L10.1349 2.88348C10.9211 1.26508 12.5805 0.15 14.5 0.15C17.1786 0.15 19.35 2.32142 19.35 5C19.35 7.06438 18.3102 8.7044 17.7845 9.46379C15.9308 12.1414 13.396 14.0634 11.1186 15.7902C10.7371 16.0796 10.3627 16.3634 10 16.6444C9.63734 16.3634 9.26302 16.0796 8.88147 15.7903C6.60419 14.0635 4.06922 12.1414 2.21549 9.46379C1.68976 8.7044 0.65 7.06438 0.65 5C0.65 2.32142 2.82142 0.15 5.5 0.15C7.41951 0.15 9.07886 1.26508 9.86508 2.88348Z'
				fill={fill}
				stroke={stroke || fill}
				strokeWidth={strokeWidth}
				className={classPath}
			/>
		</svg>
	)
}

export default HeartIcon
