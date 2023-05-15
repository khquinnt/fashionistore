import { Config } from 'tailwindcss'

const getBreakpointValue = (value: string, config: any): number => {
	return +config.theme.screens[value].slice(
		0,
		config.theme.screens[value].indexOf('px')
	)
}

export const getCurrentBreakpoint = (config: any): string => {
	let currentBreakpoint: string = ''
	let biggestBreakpointValue = 0
	for (const breakpoint of Object.keys(config.theme.screens)) {
		const breakpointValue = getBreakpointValue(breakpoint, config)
		if (
			breakpointValue > biggestBreakpointValue &&
			window.innerWidth >= breakpointValue
		) {
			biggestBreakpointValue = breakpointValue
			currentBreakpoint = breakpoint
		}
	}
	return currentBreakpoint
}
