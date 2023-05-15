import React, { useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import NumberField from '../../hook-form/NumberField'
import TextField from '../../hook-form/TextField'

function MobileField() {
	const { setValue } = useFormContext()
	let mobileWatch = useWatch({
		name: 'mobile'
	})

	useEffect(() => {
		if (mobileWatch.length === 4) {
			if (mobileWatch[3] !== '-') {
				mobileWatch = `${mobileWatch.slice(0, 3)}-${mobileWatch.slice(3)}`
				setValue('mobile', mobileWatch)
			}
		} else if (mobileWatch.length === 9) {
			if (mobileWatch[8] !== '-') {
				mobileWatch = `${mobileWatch.slice(0, 8)}-${mobileWatch.slice(8)}`
				setValue('mobile', mobileWatch)
			}
		}
		mobileWatch = mobileWatch.replace('-', '')
	}, [mobileWatch])

	function handleOnKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
		if (
			!(
				event.code?.startsWith('Digit') ||
				event.code?.startsWith('Numpad') ||
				event.code === 'Backspace' ||
				event.code === 'Tab'
			)
		)
			event.preventDefault()
	}
	return (
		<TextField
			fullWidth
			name='mobile'
			id='mobile'
			onKeyDown={(event) => handleOnKeyPress(event)}
		/>
	)
}

export default MobileField
