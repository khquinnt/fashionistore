import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

function SwitchLoginRegister() {
	const router = useRouter()
	return (
		<div className='mx-auto max-w-[400px] w-full p-2.5'>
			<h1 className='text-center text-xl mb-5 font-semibold'>
				Login or create new account
			</h1>

			<div className='rounded p-1 flex justify-between gap-2 bg-[#EFEFEF]'>
				<Link
					className={`p-2 rounded w-full text-center  ${
						router.pathname === '/login' && 'bg-white'
					}`}
					href='login'
				>
					Login
				</Link>
				<Link
					className={`p-2 rounded w-full text-center  ${
						router.pathname === '/register' && 'bg-white'
					}`}
					href='./register'
				>
					Register
				</Link>
			</div>
		</div>
	)
}

export default SwitchLoginRegister
