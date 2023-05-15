import React from 'react'
import { ProductSchema } from '../../../types/product'
import CardProduct from '../../common/CardProduct'

type SimilarItemsPropsType = {
	relatedProduct: ProductSchema[]
}

function SimilarItems({ relatedProduct }: SimilarItemsPropsType) {
	return (
		<>
			<h1 className='font-medium text-base md:text-xl lg:text-2xl'>
				Similar Items
			</h1>
			<div
				className={`grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 lg:gap-10 mt-4`}
			>
				{relatedProduct.slice(0, 4).map((p, idx) => {
					return <CardProduct product={p} key={idx} />
				})}
			</div>
		</>
	)
}

export default SimilarItems
