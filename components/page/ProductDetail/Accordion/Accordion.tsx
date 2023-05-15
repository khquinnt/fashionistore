import useTranslation from 'next-translate/useTranslation'
import React, { useState } from 'react'
import { LangEnum } from '../../../../types/common'
import { ProductSchema } from '../../../../types/product'
import AdditionInformation from '../AdditionInformation'
import Review from '../Review'
import AccordionLayout from './AccordionLayout'

type AccordionPropsType = {
	product: ProductSchema
}

function Accordion({ product }: AccordionPropsType) {
	const { t } = useTranslation('common')
	const lang = useTranslation('common').lang as LangEnum

	const [activeIndex, setActiveIndex] = useState(0)

	return (
		<div className='flex flex-col justify-center items-center lg:hidden'>
			<AccordionLayout
				title='Description'
				index={1}
				setActiveIndex={setActiveIndex}
				activeIndex={activeIndex}
			>
				<p className='leading-normal px-1 font-normal '>
					{product.description[lang]}
				</p>
			</AccordionLayout>

			<AccordionLayout
				title='Additional information'
				index={2}
				setActiveIndex={setActiveIndex}
				activeIndex={activeIndex}
			>
				<div className='px-1'>
					<AdditionInformation product={product} isMobile />
				</div>
			</AccordionLayout>
			<AccordionLayout
				title={`Reviews (${product.rating.length})`}
				index={3}
				setActiveIndex={setActiveIndex}
				activeIndex={activeIndex}
			>
				<div>
					<Review
						productId={product._id}
						active={activeIndex === 3}
						rating={product.rating}
					/>
				</div>
			</AccordionLayout>
		</div>
	)
}

export default Accordion
