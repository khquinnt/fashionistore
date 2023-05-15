import React from 'react'
import Layout from '../components/Layout'
import { NextPageWithLayout } from '../types'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import TextField from '../components/hook-form/TextField'
import Button from '../components/common/Button'

const ForgotPassword: NextPageWithLayout = () => {
	const schema = yup.object({
		email: yup.string().required('Email is required.').email('Email invalid.')
	})
	const methods = useForm<{ email: string }>({
		defaultValues: {
			email: ''
		},
		resolver: yupResolver(schema)
	})

	function handleForgotPassword(values: { email: string }) {
		console.log('values: ', values)
	}
	return (
		<section className='container mx-auto p-2.5 mt-5'>
			<h1 className='text-center text-xl mb-4 font-semibold'>Lost password?</h1>
			<p className='text-center mb-5'>
				If you've forgotten your password, enter your e-mail address and we'll
				send you an e-mail
			</p>

			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit(handleForgotPassword)}
					className='mt-10 max-w-[400px] mx-auto flex flex-col gap-3 p-4'
				>
					<div className='flex flex-col gap-1.5'>
						<label className='text-secondary' htmlFor='email'>
							Email
						</label>
						<TextField name='email' id='email' />
					</div>
					<Button className='text-sm rounded bg-black text-white py-2 mt-3 uppercase'>
						Reset password
					</Button>
				</form>
			</FormProvider>
		</section>
	)
}

ForgotPassword.getLayout = (page) => <Layout pageName=''>{page}</Layout>

export const getStaticProps = () => ({ props: {} })
export default ForgotPassword
