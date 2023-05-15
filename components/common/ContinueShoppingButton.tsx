import Link from 'next/link'
import React from 'react'
import Button from './Button'
import ChevronRight from '../icons/ChevronRight'

function ContinueShoppingButton() {
	return (
		<Link href='/'>
			<Button className='continue-shopping mt-6 p-2 rounded border border-primary relative flex items-center justify-between w-full md:w-auto md:gap-5 text-primary duration-300 transition-all hover:bg-primary hover:text-white'>
				<p className='text-sm'>Continue shopping</p>
				<ChevronRight className='w-[15px] h-[15px]' />
			</Button>
		</Link>
	)
}

export default ContinueShoppingButton
