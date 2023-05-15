import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import resolveConfig from 'tailwindcss/resolveConfig'
import useResizeWindow from '../../../hooks/useResizeWindow'
import tailwindConfig from '../../../tailwind.config' // Fix the path
import { getCurrentBreakpoint } from '../../../utils/getCurrentBreakPoint'
import Menu from './Menu'
function Header() {
	const { lang } = useTranslation()
	return (
		<nav className='flex justify-between bg-white items-center py-2.5 pb-5 container mx-auto relative'>
			<Link
				locale={lang}
				href='/'
				className='flex justify-start items-end select-none cursor-pointer'
			>
				<img src='/images/logo.png' alt='Hic' className='w-[40px] h-[40px]' />
				<h1 className='text-2xl leading-7 ml-[-10px] '>ashioniStore</h1>
			</Link>
			<Menu />
		</nav>
	)
}

export default Header
