import { yupResolver } from '@hookform/resolvers/yup'
import { AxiosResponse } from 'axios'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { FormProvider, useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import * as yup from 'yup'
import Layout from '../components/Layout'
import Button from '../components/common/Button'
import SwitchLoginRegister from '../components/common/SwitchLoginRegister'
import PasswordField from '../components/hook-form/PasswordField'
import TextField from '../components/hook-form/TextField'
import MobileField from '../components/page/Register/MobileField'
import useGetID from '../hooks/useGetID'
import { toastState } from '../recoil/atoms/toast.'
import { register } from '../services/auth'
import { NextPageWithLayout } from '../types'
import { ErrorDataType, LangEnum } from '../types/common'
import { RegisterValueType } from '../types/user'
import { phoneRegex } from '../utils/phoneFormat'
import {
	firstNameSchemaFactory,
	lastNameSchemaFactory,
	passwordSchemaFactory,
	phoneSchemaFactory
} from '../utils/user-yup-schema'

const Register: NextPageWithLayout = () => {
	const { t } = useTranslation('user')
	const lang = useTranslation('user').lang as LangEnum

	const router = useRouter()
	const [toast, setToast] = useRecoilState(toastState)

	const schema = yup.object({
		email: yup.string().required('Email is required.').email('Email invalid.'),
		password: passwordSchemaFactory(t),
		firstname: firstNameSchemaFactory(t),
		lastname: lastNameSchemaFactory(t),
		mobile: phoneSchemaFactory(t),
		confirmPassword: yup
			.string()
			.required(t('user:retype-password-required'))
			.oneOf([yup.ref('password')], t('user:incorrect-retype-password'))
	})
	const methods = useForm<RegisterValueType & { confirmPassword: string }>({
		defaultValues: {
			email: '',
			password: '',
			firstname: '',
			lastname: '',
			mobile: '',
			confirmPassword: ''
		},
		resolver: yupResolver(schema)
	})

	async function handleRegister(values: RegisterValueType) {
		values.mobile = phoneRegex(values.mobile)

		try {
			await register(values)
			router.push('/login')
		} catch (error) {
			let message: string
			const { data } = error as AxiosResponse<ErrorDataType>

			if (data) message = data.message[lang]
			else message = error as string

			setToast([...toast, { message: message, type: 'error', id: useGetID() }])
		}
	}

	return (
		<section className='container mx-auto p-2.5 mt-5'>
			<SwitchLoginRegister />
			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit(handleRegister)}
					className='mt-10 max-w-[400px] mx-auto flex flex-col gap-3 p-4'
				>
					<div className='flex flex-col gap-1.5'>
						<label className='text-secondary' htmlFor='email'>
							Email
						</label>
						<TextField name='email' id='email' />
					</div>
					<div className='flex flex-col gap-1.5'>
						<label className='text-secondary' htmlFor='firstname'>
							Firstname
						</label>
						<TextField name='firstname' id='firstname' />
					</div>
					<div className='flex flex-col gap-1.5'>
						<label className='text-secondary' htmlFor='lastname'>
							Lastname
						</label>
						<TextField name='lastname' id='lastname' />
					</div>
					<div className='flex flex-col gap-1.5'>
						<label className='text-secondary' htmlFor='mobile'>
							Mobile
						</label>
						<MobileField />
					</div>
					<div className='flex flex-col gap-1.5'>
						<label className='text-secondary' htmlFor='password'>
							Password
						</label>
						<div className='relative'>
							<PasswordField
								name='password'
								id='password'
								fullWidth
								className='pr-12'
							/>
						</div>
					</div>
					<div className='flex flex-col gap-1.5'>
						<label className='text-secondary' htmlFor='confirmPassword'>
							Confirm password
						</label>
						<div className='relative'>
							<PasswordField
								name='confirmPassword'
								id='confirmPassword'
								fullWidth
								className='pr-12'
							/>
						</div>
					</div>

					<Button
						type='submit'
						className='text-sm rounded bg-black text-white py-2 mt-3 uppercase'
					>
						Register
					</Button>
				</form>
			</FormProvider>
		</section>
	)
}

Register.getLayout = (page) => <Layout pageName=''>{page}</Layout>

export const getStaticProps = () => ({ props: {} })
export default Register
