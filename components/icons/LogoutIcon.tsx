import React, { SVGProps } from 'react'

function LogoutIcon({
	className = '',
	...svgProps
}: Partial<SVGProps<SVGSVGElement>>) {
	return (
		<svg
			width='12'
			height='14'
			viewBox='0 0 12 14'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className={`w-6 h-6  stroke-black stroke-[0.5] fill-black ${className}`}
			{...svgProps}
		>
			<path d='M1 14H7C7.26512 13.9997 7.5193 13.8942 7.70677 13.7068C7.89424 13.5193 7.9997 13.2651 8 13V11.5H7V13H1V1H7V2.5H8V1C7.9997 0.734877 7.89424 0.4807 7.70677 0.293229C7.5193 0.105759 7.26512 0.000304367 7 0H1C0.734877 0.000304367 0.4807 0.105759 0.293229 0.293229C0.105759 0.4807 0.000304367 0.734877 0 1V13C0.000304367 13.2651 0.105759 13.5193 0.293229 13.7068C0.4807 13.8942 0.734877 13.9997 1 14Z' />
			<path d='M8.293 9.293L10.086 7.5H3V6.5H10.086L8.293 4.707L9 4L12 7L9 10L8.293 9.293Z' />
		</svg>
	)
}

export default LogoutIcon
