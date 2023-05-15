import React, { SVGProps } from 'react'

function ArrowRight({
	fill = 'black',
	stroke = '',
	strokeWidth = '0.3',
	...svgProps
}: Partial<SVGProps<SVGSVGElement>>) {
	return (
		<svg
			width='15'
			height='6'
			viewBox='0 0 15 6'
			fill='none'
			{...svgProps}
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M0 2.99474V2.24474C0 2.03764 0.167945 1.86974 0.375116 1.86974H12.0037V0.369743C12.0058 0.219715 12.0972 0.0853847 12.236 0.0282559C12.3747 -0.028873 12.5342 0.00219797 12.6414 0.107243L14.8921 2.35724C15.036 2.5056 15.036 2.74138 14.8921 2.88974L12.6414 5.13974C12.5332 5.24572 12.372 5.27629 12.2325 5.21725C12.0931 5.15821 12.0028 5.02113 12.0037 4.86974V3.36974H0.375116C0.167945 3.36974 0 3.20185 0 2.99474Z'
				fill={fill}
			/>
		</svg>
	)
}

export default ArrowRight
