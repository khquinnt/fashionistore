import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { searchOpenState } from '../../recoil/atoms/search'
import { userState } from '../../recoil/atoms/user'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import Search from './Header/Search'

type LayoutPropsSchema = {
	children: React.ReactNode
	pageName?: string
}

const Layout = ({ children, pageName = '' }: LayoutPropsSchema) => {
	const [shadow, setShadow] = useState(false)

	const isSearchOpen = useRecoilValue(searchOpenState)
	const [user, setUser] = useRecoilState(userState)

	useEffect(() => {
		if (user) localStorage.setItem('@user', JSON.stringify(user))
	}, [user])

	useEffect(() => {
		const localUser = localStorage.getItem('@user')
		if (localUser) {
			setUser(JSON.parse(localUser))
		}
	}, [])

	const transitionNavBar = () => {
		if (window.scrollY > 100) setShadow(true)
		else setShadow(false)
	}

	useEffect(() => {
		const body = Array.from(document.getElementsByTagName('body'))[0]
		if (isSearchOpen) {
			body.className = 'no-scroll'
		} else {
			body.className = 'overlay'
		}
	}, [isSearchOpen])

	useEffect(() => {
		window.addEventListener('scroll', transitionNavBar)

		return () => window.removeEventListener('scroll', transitionNavBar)
	}, [])

	return (
		<div className={`${pageName} relative`}>
			<header
				className={`${
					shadow && 'shadow'
				} w-screen fixed right-0 left-0 bg-white z-20`}
			>
				<Search />
				<Header />
			</header>
			<div className='pt-[80px] min-h-[300px]'>{children}</div>
			<Footer />
		</div>
	)
}

export default Layout
