import Link from 'next/link'
import { CartSchema } from '../../../types/user'
import CartItem, { ValueAddToCart } from './CartItem'

type ShoppingCartPropsType = {
	cart: CartSchema
	handleAddToCart: (value: ValueAddToCart) => Promise<void>
}

function ShoppingCart({ cart, handleAddToCart }: ShoppingCartPropsType) {
	const { products } = cart

	return (
		<div className='mt-10'>
			<div className='flex justify-between items-center border-b border-black/10 pb-3'>
				<h1 className='text-xl font-medium'>Your cart</h1>
				<Link href='/p' className='text-sm'>
					Continue shopping
				</Link>
			</div>
			<div className='mt-5 border-b border-black/10'>
				<p>{products.length} items</p>
				<div className='flex flex-col mt-4'>
					{products.map((p, idx) => {
						return (
							<CartItem
								handleAddToCart={handleAddToCart}
								key={idx}
								product={p.product}
								attribute={p.attributeSet}
								quantity={p.quantity}
							/>
						)
					})}
				</div>
			</div>
			<div className='flex items-center justify-between mt-2'>
				<p>Subtotal ({products.length} items): </p>
				<p className='font-bold text-lg'>${cart.subTotal}</p>
			</div>
		</div>
	)
}

export default ShoppingCart
