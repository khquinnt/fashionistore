import Link from 'next/link'
import React from 'react'
import Button from '../components/common/Button'

function NotFound() {
	return (
		<div className='container mx-auto h-screen w-full flex flex-col p-2.5 justify-center'>
			<div className='max-w-[350px] md:max-w-full  mx-auto'>
				<h1 className='title-404 text-[100px] text-center md:text-left'>404</h1>
				<h1 className='font-black text-xl text-center md:text-left'>
					Oops, We can seem to find the page what you are looking for.
				</h1>
				<Link href={'/'}>
					<Button className='self-start mt-8 px-6 py-3 rounded border border-gray-300 hover:bg-gray-100 w-full md:w-auto'>
						Back to home page
					</Button>
				</Link>
			</div>
		</div>
	)
}

export default NotFound
