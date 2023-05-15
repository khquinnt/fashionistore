/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		screens: {
			xs: '630px',
			sm: '640px',
			// => @media (min-width: 640px) { ... }

			md: '768px',
			// => @media (min-width: 768px) { ... }

			lg: '1024px',
			// => @media (min-width: 1024px) { ... }

			xl: '1280px',
			// => @media (min-width: 1280px) { ... }

			'2xl': '1536px'
			// => @media (min-width: 1536px) { ... }
		},
		extend: {
			colors: {
				primary: '#A18A68',
				beige: '#fff7ea',
				secondary: '#707070',
				error: '#D82700',
				line: '#d8d8d8',
				check: '#3fbd60',
				infor: '#006de5',
				warning: '#ee9500'
			},
			keyframes: {
				zoomIn: {
					'0%': {
						opacity: '0',
						transform: 'scale(0.8)'
					},
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				fade: {
					'0%': {
						opacity: 0.2
					},
					'100%': {
						opacity: 1
					}
				},
				fadeReverse: {
					'100%': {
						opacity: 1
					},
					'0%': {
						opacity: 0.2
					}
				}
			},
			animation: {
				'zoom-in': 'zoomIn .15s cubic-bezier(1,.99,0,-0.01) forwards',
				fade: 'fade .8s linear',
				'fade-reverse': 'fadeReverse .8s linear'
			}
		},
		fontFamily: {
			kenia: ['Kenia', 'cursive']
		}
	},
	plugins: [require('@tailwindcss/line-clamp')]
}
