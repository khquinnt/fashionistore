import React from 'react'
import LanguageIcon from '../../icons/LanguageIcon'
import UserIcon from '../../icons/User'
import LogoutIcon from '../../icons/LogoutIcon'
import { logout } from '../../../services/user'
import { useSetRecoilState } from 'recoil'
import { toastState } from '../../../recoil/atoms/toast.'
import { AxiosResponse } from 'axios'
import { ErrorDataType, LangEnum, ToastType } from '../../../types/common'
import useTranslation from 'next-translate/useTranslation'
import useGetID from '../../../hooks/useGetID'
import { useRouter } from 'next/router'
import { loadingOpenState } from '../../../recoil/atoms/loading'
import { userState } from '../../../recoil/atoms/user'

function UserMenu({ className }: { className?: string }) {
	const setLoading = useSetRecoilState(loadingOpenState)
	const setToast = useSetRecoilState(toastState)
	const setUser = useSetRecoilState(userState)

	const lang = useTranslation('common').lang as LangEnum
	const router = useRouter()

	async function handleLogout() {
		setLoading(true)
		try {
			await logout()
			setUser(null)
			localStorage.removeItem('guestToken')
			localStorage.removeItem('@user')

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

			setToast([toastData])
		} finally {
			setLoading(false)
		}
	}

	return (
		<ul
			className={`lg:bg-white lg:shadow-lg lg:border-black-100 lg:border flex flex-col  ${className}`}
		>
			<li className='user-menu-list group'>
				<UserIcon strokeWidth={1} />
				<p>Profile</p>
			</li>
			<li className='user-menu-list group'>
				<LanguageIcon />
				<p>Vietnamese</p>
			</li>
			<li className='user-menu-list group' onClick={handleLogout}>
				<LogoutIcon />
				<p>Logout</p>
			</li>
		</ul>
	)
}

export default UserMenu
