import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { CartSchema, UserSchema } from '../../../types/user'

function CartMenu({
	className,
	cart,
	user
}: {
	className?: string
	cart: CartSchema | null
	user: UserSchema | null
}) {
	const router = useRouter()

	const handleClickCart = React.useCallback(() => {
		if (user) {
			router.push(`/cart`)
		} else {
			router.push('/login')
		}
	}, [cart, user])

	const cartCount = useMemo(() => {
		if (!cart) return 0
		else return cart.products.length
	}, [cart])

	return (
		<div
			className={`${className} relative cursor-pointer`}
			onClick={handleClickCart}
		>
			<img src='/images/cart.svg' alt='Cart' className=' w-[25px]' />
			{cartCount > 0 && (
				<p className='absolute -top-1/2 -right-1/2 w-6 h-6 bg-primary text-white border rounded-full flex justify-center item-center'>
					<span className='text-[12px]'>{cartCount}</span>
				</p>
			)}
		</div>
	)
}

export default CartMenu
