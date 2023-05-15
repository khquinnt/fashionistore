import React, { SVGProps } from 'react'
import { IconType } from '../../types/icon'

function InstagramIcon({
	fill = 'black',
	stroke = '',
	strokeWidth = '0.3',
	classPath,
	...svgProps
}: IconType & Partial<SVGProps<SVGSVGElement>>) {
	return (
		<svg
			width='12'
			height='12'
			viewBox='0 0 12 12'
			fill='none'
			{...svgProps}
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M8.66667 0H3.33333C1.49238 0 0 1.49238 0 3.33333V8.66667C0 10.5076 1.49238 12 3.33333 12H8.66667C10.5076 12 12 10.5076 12 8.66667V3.33333C12 1.49238 10.5076 0 8.66667 0ZM10.8334 8.66663C10.8297 9.86172 9.86178 10.8296 8.66669 10.8333H3.33335C2.13826 10.8296 1.17035 9.86172 1.16669 8.66663V3.33329C1.17035 2.1382 2.13826 1.17029 3.33335 1.16663H8.66669C9.86178 1.17029 10.8297 2.1382 10.8334 3.33329V8.66663ZM9.16659 3.49996C9.53478 3.49996 9.83326 3.20148 9.83326 2.83329C9.83326 2.4651 9.53478 2.16663 9.16659 2.16663C8.7984 2.16663 8.49992 2.4651 8.49992 2.83329C8.49992 3.20148 8.7984 3.49996 9.16659 3.49996ZM6 3.00001C4.34315 3.00001 3 4.34315 3 6.00001C3 7.65686 4.34315 9.00001 6 9.00001C7.65685 9.00001 9 7.65686 9 6.00001C9.00178 5.20381 8.68628 4.43972 8.12328 3.87673C7.56029 3.31373 6.79619 2.99823 6 3.00001ZM4.16669 5.99996C4.16669 7.01248 4.9875 7.83329 6.00002 7.83329C7.01254 7.83329 7.83335 7.01248 7.83335 5.99996C7.83335 4.98744 7.01254 4.16663 6.00002 4.16663C4.9875 4.16663 4.16669 4.98744 4.16669 5.99996Z'
				fill={fill}
				stroke={stroke || fill}
				strokeWidth={strokeWidth}
				className={classPath}
			/>
		</svg>
	)
}

export default InstagramIcon
