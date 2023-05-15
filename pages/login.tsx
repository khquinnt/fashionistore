import { yupResolver } from '@hookform/resolvers/yup'
import { AxiosResponse } from 'axios'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormProvider, useForm } from 'react-hook-form'
import { useRecoilState, useSetRecoilState } from 'recoil'
import * as yup from 'yup'
import Layout from '../components/Layout'
import Button from '../components/common/Button'
import SwitchLoginRegister from '../components/common/SwitchLoginRegister'
import PasswordField from '../components/hook-form/PasswordField'
import TextField from '../components/hook-form/TextField'
import useGetID from '../hooks/useGetID'
import { toastState } from '../recoil/atoms/toast.'
import { userState } from '../recoil/atoms/user'
import { login } from '../services/auth'
import { NextPageWithLayout } from '../types'
import { ErrorDataType, LangEnum, ToastType } from '../types/common'
import { LoginValueType } from '../types/user'

const Login: NextPageWithLayout = () => {
	const { t } = useTranslation('user')
	const lang = useTranslation('user').lang as LangEnum
	const [toast, setToast] = useRecoilState(toastState)

	const router = useRouter()
	const setUser = useSetRecoilState(userState)

	const schema = yup.object({
		email: yup.string().required('Email is required.').email('Email invalid.'),
		password: yup.string().required('Password is required.')
	})
	const methods = useForm<LoginValueType>({
		defaultValues: {
			email: '',
			password: '',
			remember: false
		},
		resolver: yupResolver(schema)
	})

	async function handleLogin(values: LoginValueType) {
		try {
			const user = await login(values)

			localStorage.setItem('guestToken', user.accessToken)
			localStorage.setItem('@user', JSON.stringify(user))

			setUser(user)
			router.replace('/')
		} catch (error) {
			let message: string
			const { data } = error as AxiosResponse<ErrorDataType>

			if (data) message = data.message[lang]
			else message = error as string

			const toastData = {
				message: message,
				type: 'error',
				id: useGetID()
			} as ToastType
			setToast([...toast, toastData])
		}
	}

	return (
		<section className='container mx-auto p-2.5 mt-5'>
			<SwitchLoginRegister />
			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit(handleLogin)}
					className='mt-10 max-w-[400px] mx-auto flex flex-col gap-3 p-4'
				>
					<div className='flex flex-col gap-1.5'>
						<label className='text-secondary' htmlFor='email'>
							Email
						</label>
						<TextField name='email' id='email' />
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
					<div className='flex gap-2'>
						<TextField name='remember' id='remember' type='checkbox' />
						<label
							className='text-secondary cursor-pointer text-base mt-[-1px]'
							htmlFor='remember'
						>
							Remember me
						</label>
					</div>
					<Button
						type='submit'
						className='text-sm rounded bg-black text-white py-2 mt-3 uppercase'
					>
						Login
					</Button>
					<Link href='/forgot-password'>
						<p className='text-center hover:underline'>
							Have you forgotten your password?
						</p>
					</Link>
				</form>
			</FormProvider>
		</section>
	)
}

Login.getLayout = (page) => <Layout pageName=''>{page}</Layout>

export const getStaticProps = () => ({ props: {} })
export default Login
