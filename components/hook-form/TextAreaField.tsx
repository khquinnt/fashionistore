import React, { InputHTMLAttributes } from 'react'
import { Control, useController } from 'react-hook-form'

type PropsType = {
	control?: Control | any
	name: string
	fullWidth?: boolean
}

function TextAreaField(
	props: PropsType & Partial<InputHTMLAttributes<HTMLTextAreaElement>>
) {
	const {
		control,
		name,
		className = '',
		fullWidth = false,
		...textAreaFieldProps
	} = props

	const {
		field: { ref: inputRef, ...inputProps },
		fieldState: { error }
	} = useController({ name, control })

	return (
		<div className={`inline-block ${fullWidth && 'w-full'}`}>
			<textarea
				{...inputProps}
				{...inputRef}
				{...textAreaFieldProps}
				className={`relative border px-2 py-1 rounded outline-none w-full ${className} ${
					error && 'border-[.5px] border-rose-500'
				}`}
			></textarea>
			{!!error && (
				<p className='bottom-0 text-[13px] text-error ml-2 mt-1'>
					{error.message}
				</p>
			)}
		</div>
	)
}

export default TextAreaField