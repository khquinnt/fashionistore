import { AxiosResponse } from 'axios'
import useTranslation from 'next-translate/useTranslation'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import Layout from '../../components/Layout'
import CartEmpty from '../../components/page/Cart/CartEmpty'
import { ValueAddToCart } from '../../components/page/Cart/CartItem'
import ShoppingCart from '../../components/page/Cart/ShoppingCart'
import useGetID from '../../hooks/useGetID'
import { loadingOpenState } from '../../recoil/atoms/loading'
import { toastState } from '../../recoil/atoms/toast.'
import { userState } from '../../recoil/atoms/user'
import { addToCart, getCart } from '../../services/user'
import { NextPageWithLayout } from '../../types'
import { ErrorDataType, LangEnum, ToastType } from '../../types/common'
import { CartSchema } from '../../types/user'

const CartDetail: NextPageWithLayout = () => {
	const [user, setUser] = useRecoilState(userState)
	const setLoading = useSetRecoilState(loadingOpenState)
	const [cart, setCart] = useState<CartSchema>()
	const lang = useTranslation('common').lang as LangEnum
	const [toast, setToast] = useRecoilState(toastState)

	async function fetchCart() {
		setLoading(true)
		try {
			const data = await getCart()
			if (user) {
				setUser({ ...user, cart: data.cart })
			}
			setCart(data.cart)
		} catch (error) {
			console.error(error)
			if (user) setUser({ ...user, cart: null })
		} finally {
			setLoading(false)
		}
	}

	async function handleAddToCart(value: ValueAddToCart) {
		const data = {
			quantity: +value.quantity,
			price: +value.price,
			attribute: value.attribute
		}
		setLoading(true)
		try {
			const result = await addToCart(value.id, data, true)
			if (user) setUser({ ...user, cart: result.cart })
			fetchCart()
		} catch (error) {
			let message: string
			const { data } = error as AxiosResponse<ErrorDataType>

			if (data) message = data.message[lang]
			else message = error as string

			const toastData = {
				message: message,
				type: 'error',
				id: useGetID()
			} as ToastType

			setToast([...toast, toastData])
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchCart()
	}, [])

	return (
		<section className='container mx-auto px-2.5 relative'>
			{!cart || cart.products.length === 0 ? (
				<CartEmpty setLoading={setLoading} />
			) : (
				<ShoppingCart cart={cart} handleAddToCart={handleAddToCart} />
			)}
		</section>
	)
}

CartDetail.getLayout = (page: React.ReactElement) => (
	<Layout pageName=''>{page}</Layout>
)

export default CartDetail
