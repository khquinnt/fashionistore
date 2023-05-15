import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { loadingOpenState } from '../../../recoil/atoms/loading'
import { getHostedProduct } from '../../../services/product'
import { ProductSchema } from '../../../types/product'
import CardProduct from '../../common/CardProduct'

function HotestProduct() {
	const [hotProduct, setHotProduct] = useState<ProductSchema[]>([])
	const setLoading = useSetRecoilState(loadingOpenState)

	useEffect(() => {
		;(async () => {
			try {
				const products = await getHostedProduct()
				setHotProduct(products)
			} catch (error) {
				console.log('error: ', error)
			} finally {
				setLoading(false)
			}
		})()
	}, [])

	return (
		<div className='mb-3 mt-10 lg:mt-16 cursor-pointer'>
			<div className='flex justify-between items-end mb-5 lg:mb-10'>
				<h1 className='text-xl leading-[27px] font-semibold lg:text-2xl'>
					Shop the latest
				</h1>
				<Link
					href=''
					className='text-primary text-[14px] leading-[22px] hover:underline lg:text-xl'
				>
					View all
				</Link>
			</div>
			<div
				className={`hostest-prod-grid grid grid-cols-2 md:grid-cols-3 gap-4 gap-y-6 md:gap-6 lg:gap-14`}
			>
				{hotProduct.map((p) => {
					return (
						<React.Fragment key={p._id}>
							<CardProduct product={p} />
						</React.Fragment>
					)
				})}
			</div>
		</div>
	)
}

export default HotestProduct
