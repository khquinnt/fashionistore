import React, { SVGProps } from 'react'

function LanguageIcon({
	className = '',
	...svgProps
}: Partial<SVGProps<SVGSVGElement>>) {
	return (
		<svg
			width='13'
			height='9'
			viewBox='0 0 13 9'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className={`w-6 h-6 stroke-black  fill-black ${className}`}
			{...svgProps}
		>
			<path d='M6.91999 8.99998V2.99828H8.39149V3.99828H8.44894C8.56296 3.64931 8.78972 3.34813 9.09358 3.1421C9.39744 2.93606 9.76115 2.83685 10.1275 2.86008C11.3575 2.86008 12.0475 3.71093 12.0475 5.20553V8.99998H10.5759V5.35533C10.5759 4.50448 10.2885 4.06763 9.58714 4.06763C8.97779 4.06763 8.39149 4.38953 8.39149 5.03333V8.99998H6.91999Z' />
			<path d='M0.111816 8.99998V0.974976H5.40077V2.31998H1.62952V4.26308H4.96387V5.60833H1.62952V7.65498H5.40077V8.99998H0.111816Z' />
		</svg>
	)
}

export default LanguageIcon
