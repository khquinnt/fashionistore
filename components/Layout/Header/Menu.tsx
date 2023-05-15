import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import useResizeWindow from '../../../hooks/useResizeWindow'
import { userState } from '../../../recoil/atoms/user'
import CartMenu from './Cart'
import SearchIcon from './SearchIcon'
import UserMenu from './UserMenu'

function Menu() {
	const router = useRouter()
	const user = useRecoilValue(userState)
	const [isShow, setIsShow] = useState(false)
	const { width } = useResizeWindow()

	const handleShowMenu = () => {
		setIsShow(!isShow)
	}

	useEffect(() => {
		if (width >= 1024) setIsShow(false)
	}, [width > 1024])

	useEffect(() => {
		setIsShow(false)
	}, [router])

	return (
		<>
			<div className='flex flex-1 justify-end self-end align-center'>
				<SearchIcon className='lg:hidden' />
				<CartMenu
					user={user}
					className='lg:hidden ml-4'
					cart={user && user.cart}
				/>
				<img
					src={`/images/${isShow ? 'close.svg' : 'menu-icon.svg'}`}
					alt='Hamburger menu'
					className='cursor-pointer pl-[16px] pr-[4px] lg:hidden'
					onClick={handleShowMenu}
				/>
				<ul
					className={`header-menu ${isShow ? ' top-[70px]' : 'top-[-300px]'}`}
				>
					<li className='cursor-pointer  px-6 py-4 w-full lg:w-[unset] text-right lg:py-0 hover:underline '>
						<a href='' className=''>
							Store
						</a>
					</li>
					<li className='cursor-pointer  px-6 py-4 w-full lg:w-[unset] text-right lg:py-0 hover:underline '>
						<a href='' className=''>
							Blog
						</a>
					</li>
					<li className='cursor-pointer  px-6 py-4 w-full lg:w-[unset] text-right lg:py-0 hover:underline  border-b  lg:border-transparent'>
						<a href='' className=''>
							Our Story
						</a>
					</li>
					<li className='border-r w-5 h-5 hidden lg:block'></li>
					<li className='px-6 py-4 lg:py-0 '>
						<div className='flex flex-col lg:flex-row-reverse lg:justify-between'>
							<div className={`relative ${user && 'group'} line-after`}>
								<img
									src='/images/user.svg'
									alt='User'
									className='w-[25px] cursor-pointer hidden lg:block lg:mb-[unset] lg:ml-10'
									onClick={!user ? () => router.push('/login') : () => {}}
								/>
								<UserMenu
									className={`lg:absolute right-[-25px] top-10  lg:hidden group-hover:block`}
								/>
							</div>
							<CartMenu
								user={user}
								cart={user && user.cart}
								className='hidden lg:block lg:ml-10'
							/>
							<SearchIcon className='hidden lg:block lg:ml-10' />
						</div>
					</li>
				</ul>
			</div>
		</>
	)
}

export default Menu
