import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { SetterOrUpdater } from 'recoil'
import { newestProduct } from '../../../services/product'
import { ProductSchema } from '../../../types/product'
import CardProduct from '../../common/CardProduct'
import ContinueShoppingButton from '../../common/ContinueShoppingButton'

type CartEmptyPropsType = {
	setLoading: SetterOrUpdater<boolean>
}

function CartEmpty({ setLoading }: CartEmptyPropsType) {
	const [newProduct, setNewProduct] = useState<ProductSchema[]>([])

	async function fetchNewestProducts() {
		setLoading(true)
		try {
			const newestProducts = await newestProduct()
			setNewProduct(newestProducts.slice(0, 4))
		} catch (error) {
			console.log('error: ', error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchNewestProducts()
	}, [])

	return (
		<div className='mt-10'>
			<div className='flex items-center justify-center flex-col'>
				<h1 className='text-3xl mt-6 mb-1'>Your cart is empty</h1>
				<ContinueShoppingButton />
			</div>
			<div className='mt-14 md:mt-20'>
				<div className='flex justify-between items-end mb-5 lg:mb-5'>
					<h2 className='text-lg leading-[27px] lg:text-2xl'>
						Featured collection
					</h2>
					<Link
						href='/p'
						className='text-primary text-[14px] leading-[22px] hover:underline lg:text-xl'
					>
						View all
					</Link>
				</div>

				<div
					className={`grid grid-cols-2 lg:grid-cols-4 gap-4 gap-y-6 md:gap-6 lg:gap-5`}
				>
					{newProduct.map((p) => {
						return (
							<React.Fragment key={p._id}>
								<CardProduct product={p} />
							</React.Fragment>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default CartEmpty
