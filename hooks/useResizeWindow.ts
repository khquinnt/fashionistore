import { useState, useEffect } from 'react'

// Import useResizeWindow to Header component
export default function useResizeWindow() {
	const [dimensions, setDimensions] = useState({
		width: globalThis?.window?.innerWidth,
		height: globalThis?.window?.innerHeight
	})

	const handleResize = () => {
		setDimensions({
			width: window.innerWidth,
			height: window.innerHeight
		})
	}

	useEffect(() => {
		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return dimensions
}
