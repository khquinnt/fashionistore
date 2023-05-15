import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { shimmer, toBase64 } from '../../../utils/common'
import { ButtonHover } from '../../common/Button'

function NewIn() {
	return (
		<section className='bg-beige'>
			<div className='newin-section container mx-auto px-6'>
				<div className='newin-explore'>
					<h1 className='newin-text'>New in</h1>
					<h2 className='newin-text'>Accessories</h2>
					<div className='mb-7 sm:mb-0 mt-4 sm:py-2'>
						<Link href={'/p'}>
							<ButtonHover
								text='Explore'
								className='px-10 py-3 border border-primary text-primary'
							/>
						</Link>
					</div>
				</div>

				<div className='newin-img newin-img-top'>
					<Image
						className='object-cover'
						src='/images/newIn1.jpg'
						alt='New in accessories'
						fill
						placeholder='blur'
						blurDataURL={`data:image/svg+xml;base64,${toBase64(
							shimmer(700, 475)
						)}`}
					/>
				</div>
				<div className='newin-img newin-img-bot'>
					<Image
						className='object-cover'
						src='/images/newIn2.jpg'
						alt='New in accessories'
						fill
						placeholder='blur'
						blurDataURL={`data:image/svg+xml;base64,${toBase64(
							shimmer(700, 475)
						)}`}
					/>
				</div>
			</div>
		</section>
	)
}

export default NewIn
