import React, { InputHTMLAttributes, useEffect } from 'react'
import { Control, useController } from 'react-hook-form'

type PropsType = {
	control?: Control | any
	name: string
	fullWidth?: boolean
	hideError?: boolean
}

function NumberField(
	props: PropsType & Partial<InputHTMLAttributes<HTMLInputElement>>
) {
	const {
		control,
		name,
		className = '',
		fullWidth = false,
		hideError = false,
		...numberFieldProps
	} = props

	const {
		field: { ref: inputRef, ...inputProps },
		fieldState: { error }
	} = useController({
		name,
		control
	})

	const renderError = () => {
		if (!hideError) {
			return (
				<>
					{!!error && (
						<p className='bottom-0 text-[13px] text-error ml-2 mt-1'>
							{error.message}
						</p>
					)}
				</>
			)
		}
	}

	return (
		<div className={`${fullWidth && 'w-full'}`}>
			<input
				{...inputProps}
				{...inputRef}
				{...numberFieldProps}
				onWheel={(e) => e.currentTarget.blur()}
				className={`relative border px-2 py-1 rounded outline-none ${className}  ${
					fullWidth && 'w-[100%]'
				} `}
				type='number'
			/>
			{renderError()}
		</div>
	)
}

export default NumberField
