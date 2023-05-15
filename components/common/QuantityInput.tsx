import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import NumberField from '../hook-form/NumberField'
import { ButtonHover } from './Button'

type QuantityInputPropsType = {
	max: number
	quantityWatch: number
	disabled?: boolean
	disabledButton?: boolean
	handleSubmitOnChange?: () => void
}

function QuantityInput({
	max,
	quantityWatch,
	disabled,
	disabledButton = false,
	handleSubmitOnChange
}: QuantityInputPropsType) {
	const { setValue } = useFormContext()

	useEffect(() => {
		if (!quantityWatch) setValue('quantity', 1)
		if (quantityWatch > max) {
			setValue('quantity', max)
		}
	}, [quantityWatch, max])

	const handleOnKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		const canClick = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'Backspace']
		if (event.code === 'Minus' || event.code === 'Period') {
			event.preventDefault()
		}
		if (quantityWatch === max && !canClick.includes(event.code)) {
			event.preventDefault()
		}
	}

	const handleChangeQuantity = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		type: '-' | '+'
	) => {
		e.preventDefault()
		if (type === '+') {
			// if (quantityWatch < max && !disabled)
			setValue('quantity', quantityWatch + 1)

			if (handleSubmitOnChange) {
				handleSubmitOnChange()
			}
		}
		if (type === '-') {
			if (quantityWatch > 1) setValue('quantity', quantityWatch - 1)
			if (handleSubmitOnChange) {
				handleSubmitOnChange()
			}
		}
	}
	return (
		<div className='mt-2 flex items-center justify-start bg-[#EFEFEF] rounded'>
			<ButtonHover
				text='-'
				className='px-3 p-2 rounded-tl rounded-bl border-r-0 z-[1]'
				onClick={(e) => handleChangeQuantity(e, '-')}
				disabled={quantityWatch === 1}
			/>
			<NumberField
				disabled={disabled}
				hideError
				className='text-center w-[60px] border-0 rounded-none bg-[#EFEFEF]'
				min={1}
				max={max}
				name='quantity'
				onKeyDown={(event) => handleOnKeyPress(event)}
			/>
			<ButtonHover
				text='+'
				className='px-3 p-2 rounded-tr rounded-br border-l-0'
				onClick={(e) => handleChangeQuantity(e, '+')}
				disabled={disabledButton && quantityWatch === max}
			/>
		</div>
	)
}

export default QuantityInput
