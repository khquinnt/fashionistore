import Link from 'next/link'
import React from 'react'
import FbIcon from '../../icons/FbIcon'
import InstagramIcon from '../../icons/InstagramIcon'
import TwitterIcon from '../../icons/TwitterIcon'
import ContactInput from './ContactInput'

function Footer() {
	return (
		<footer className='container mx-auto px-2.5 py-10 pb-[50px] relative'>
			<div className='border-[#D8D8D8] border-t mt-[50px] mb-5'></div>
			<div className='flex flex-col lg:flex-row-reverse mb-8'>
				<ContactInput />
				<ul className='flex flex-col lg:flex-1 lg:flex-row mt-3'>
					{['CONTACT', 'TERMS OF SERVICES', 'SHIPPING AND RETURNS'].map((i) => {
						return (
							<li
								key={i}
								className='text-sm lg:text-[16px] mb-2 lg:mb-0 py-1 lg:py-0 lg:mr-8 lg:pr-2 text-[#707070]'
							>
								<Link href=''>{i}</Link>
							</li>
						)
					})}
				</ul>
			</div>
			<div className='lg:flex lg:flex-row-reverse justify-between items-center'>
				<div className='flex items-center justify-start mb-11 lg:mb-0'>
					<div className='text-base relative lg:hidden'>Follow us</div>
					<div className='w-14 border-t-[1px] border-black mx-4 lg:hidden'></div>
					<div className='flex items-center '>
						<Link
							target='_blank'
							href='https://www.fb.com/PhanVuThanhDao'
							className='group'
						>
							<FbIcon
								className='mr-4 lg:mr-7'
								width={25}
								height={25}
								fill='#707070'
								classPath='group-hover:fill-black'
							/>
						</Link>
						<Link
							target='_blank'
							href='https://www.instagram.com/_thanhdao_/'
							className='group'
						>
							<InstagramIcon
								className='mr-4 lg:mr-7'
								width={25}
								height={25}
								fill='#707070'
								classPath='group-hover:fill-black'
							/>
						</Link>
						<Link
							target='_blank'
							href='https://www.twitter.com'
							className='group'
						>
							<TwitterIcon
								className='mr-4 lg:mr-7'
								width={25}
								height={25}
								fill='#707070'
								classPath='group-hover:fill-black'
							/>
						</Link>
					</div>
				</div>
				<div className='text-secondary text-sm lg:text-lg'>
					© 2022 DaoPVT. Terms of use and privacy policy.
				</div>
			</div>
		</footer>
	)
}

export default Footer
