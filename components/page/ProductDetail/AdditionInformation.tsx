import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { LangEnum } from '../../../types/common'
import { ProductSchema } from '../../../types/product'

function AdditionInformation({
	product,
	isMobile = false
}: {
	product: ProductSchema
	isMobile?: boolean
}) {
	const { t } = useTranslation('common')
	const lang = useTranslation('common').lang as LangEnum

	return (
		<div className='px-1'>
			{product.attributeSet.map((attr, idx) => {
				return (
					<div
						className={`flex items-center ${isMobile ? 'mb-3' : 'mb-4'}`}
						key={idx}
					>
						<p className='font-semibold mr-2'>{attr.key} :</p>
						<div className='flex gap-2'>
							{attr.value.map((v, i) => (
								<p key={i}>
									{v} {i + 1 !== attr.value.length && ','}
								</p>
							))}
						</div>
					</div>
				)
			})}
			{product.category.map((c, i) => (
				<div
					className={`flex items-center ${isMobile ? 'mb-3' : 'mb-4'}`}
					key={i}
				>
					<p className='font-semibold mr-2'>Categories :</p>
					<p key={i}>
						{c.name[lang]} {i + 1 !== product.category.length && ','}
					</p>
				</div>
			))}
			<div className={`flex items-center ${isMobile ? 'mb-3' : 'mb-4'}`}>
				<p className='font-semibold mr-2'>Brand :</p>
				<p>{product.brand.name}</p>
			</div>
		</div>
	)
}

export default AdditionInformation
