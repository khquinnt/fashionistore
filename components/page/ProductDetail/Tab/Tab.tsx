import useTranslation from 'next-translate/useTranslation'
import React, { useRef, useState } from 'react'
import { LangEnum } from '../../../../types/common'
import { ProductSchema } from '../../../../types/product'
import AdditionInformation from '../AdditionInformation'
import Review from '../Review'

type TabPropsType = {
	product: ProductSchema
}

function Tab({ product }: TabPropsType) {
	const { t } = useTranslation('common')
	const lang = useTranslation('common').lang as LangEnum

	const [activeIndex, setActiveIndex] = useState(1)
	const tabContentRef = useRef<HTMLDivElement>(null)

	const tabData: {
		title: string
		children: React.ReactElement | string
		className?: string
	}[] = [
		{
			title: 'Description',
			children: <p className='leading-normal'>{product.description[lang]}</p>
		},
		{
			title: 'Additional information',
			children: <AdditionInformation product={product} />,
			className: 'hidden'
		},
		{
			title: `Reviews (${product.rating.length})`,
			children: <Review productId={product._id} rating={product.rating} />,
			className: 'hidden'
		}
	]

	const handleSetActive = (idx: number) => {
		if (idx !== activeIndex) {
			if (tabContentRef.current) {
				const childCountList = Array.from(tabContentRef.current.children)

				childCountList[idx - 1].classList.remove('hidden')
				childCountList[activeIndex - 1].classList.add('hidden')

				setActiveIndex(idx)
			}
		}
	}

	return (
		<div className='mt-10 hidden lg:block'>
			<div className='flex gap-3 border-b-[0.5px]'>
				{tabData.map((i, idx) => {
					return (
						<div
							onClick={() => handleSetActive(idx + 1)}
							className={`cursor-pointer px-3 py-3 transition-all duration-300 ${
								activeIndex === idx + 1
									? 'text-primary border-b-2 border-primary'
									: 'border-b-2 border-transparent'
							}`}
							key={idx}
						>
							{i.title}
						</div>
					)
				})}
			</div>
			<div ref={tabContentRef} className='mt-6 mb-10'>
				{tabData.map((i, idx) => {
					return (
						<div
							key={idx}
							id={`tab-content-${idx + 1}`}
							className={`${i.className || ''}`}
						>
							{i.children}
						</div>
					)
				})}
				{/* <div id='tab-content-1' className=''>
					<p className='font-normal '>{product.description[lang]}</p>
				</div>
				<div id='tab-content-2' className='flex flex-col gap-6 hidden'>
					<div className=''>
						<span className='font-semibold'>Weight: </span>
						<span>0.3 kg</span>
					</div>
					<div className=''>
						<span className='font-semibold'>Dimentions: </span>
						<span>15 x 10 x 1 cm</span>
					</div>
					<div className=''>
						<span className='font-semibold'>Color: </span>
						<span>Black, Browns, White</span>
					</div>
					<div className=''>
						<span className='font-semibold'>Material: </span>
						<span>Metal</span>
					</div>
				</div>
				<div id='tab-content-3' className='hidden'>
					This is Reviews Content
				</div> */}
			</div>
		</div>
	)
}

export default Tab
