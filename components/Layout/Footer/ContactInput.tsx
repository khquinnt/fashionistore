import React, { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import Button from '../../common/Button'
import TextField from '../../hook-form/TextField'
import ArrowRight from '../../icons/ArrowRight'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

type GetNewsFromEmail = {
	email: string
	termAgree: boolean
}

function ContactInput() {
	const schema = yup.object({
		email: yup.string().required('Email is required.').email('Email invalid.')
	})
	const methods = useForm<GetNewsFromEmail>({
		defaultValues: {
			email: '',
			termAgree: false
		},
		resolver: yupResolver(schema)
	})

	const handleSubmit = useCallback((values: GetNewsFromEmail) => {
		console.log(
			'🚀 ~ file: ContactInput.tsx:17 ~ ContactInput ~ values',
			values
		)
	}, [])

	return (
		<FormProvider {...methods}>
			<form noValidate onSubmit={methods.handleSubmit(handleSubmit)}>
				<div className='relative'>
					<TextField
						autoComplete='off'
						className='w-full border-0 px-0 relative border-b-[2px] border-black rounded-none pr-[50px]'
						name='email'
						type='email'
						placeholder='Give an email, get the newsletter.'
					/>
					<Button type='submit' className='p-3 pr-0 absolute top-0 right-0'>
						<ArrowRight fill='#707070' width={30} height={10} />
					</Button>
				</div>
				<div className='flex items-center mt-3 mb-10 lg:w-[400px]'>
					<TextField name='termAgree' id='termAgree' type='checkbox' />
					<label htmlFor='termAgree' className='ml-1 text-sm lg:text-[16px]'>
						I agree to the website's terms and conditions
					</label>
				</div>
			</form>
		</FormProvider>
	)
}

export default ContactInput
