import { AxiosResponse } from 'axios'
import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import useGetID from '../../hooks/useGetID'
import { loadingOpenState } from '../../recoil/atoms/loading'
import { toastState } from '../../recoil/atoms/toast.'
import { userState } from '../../recoil/atoms/user'
import { addToWishList, removeFromWishList } from '../../services/user'
import { ErrorDataType, LangEnum, ToastType } from '../../types/common'
import { ProductSchema } from '../../types/product'
import { getTotalQuantity, thumbnailPlaceholderUrl } from '../../utils/common'
import CartIcon from '../icons/CartIcon'
import EyeIcon from '../icons/EyeIcon'
import HeartIcon from '../icons/HeartIcon'
import Badge from './Badge'

type CardProductProps = {
	product: ProductSchema
	className?: string
}

function CardProduct({ product, className = '' }: CardProductProps) {
	const {
		_id,
		name,
		original_price,
		images,
		attributeSet,
		special_price,
		slug
	} = product
	const { t } = useTranslation('common')
	const lang = useTranslation('common').lang as LangEnum
	const [isLike, setIsLike] = useState<boolean>(false)
	const [user, setUser] = useRecoilState(userState)
	const setLoading = useSetRecoilState(loadingOpenState)
	const [toast, setToast] = useRecoilState(toastState)

	const router = useRouter()

	const toastData = {
		message: '',
		type: 'check',
		id: useGetID()
	} as ToastType

	useEffect(() => {
		if (!user) setIsLike(false)
		else if (user.wishList.includes(_id)) {
			setIsLike(true)
		}
	}, [user?.wishList])

	const handleAddToCart = useCallback(() => {
		if (user) {
			router.push(`/p/${slug}`)
		} else {
			router.push('/login')
		}
	}, [user])

	const handleSeeDetail = useCallback((slug: string) => {
		router.push(`/p/${slug}`)
	}, [])

	const handleAddToWishList = useCallback(async () => {
		if (!user) {
			return router.push('/login')
		} else {
			setLoading(true)

			try {
				const { message, data } = await addToWishList(_id)
				setIsLike(!isLike)

				if (user) {
					const newDataUser = { ...user }
					newDataUser.wishList = data
					setUser(newDataUser)
				}

				setToast([...toast, { ...toastData, message: message[lang] }])
			} catch (error) {
				let message: string
				const { data } = error as AxiosResponse<ErrorDataType>

				if (data) message = data.message[lang]
				else message = error as string
				setToast([...toast, { ...toastData, message, type: 'error' }])
			} finally {
				setLoading(false)
			}
		}
	}, [isLike, toast, user])

	const handleRemoveFromnWishList = useCallback(async () => {
		setLoading(true)
		try {
			const { message, data } = await removeFromWishList(_id)
			setIsLike(!isLike)

			if (user) {
				const newDataUser = { ...user }
				newDataUser.wishList = data
				setUser(newDataUser)
			}

			setToast([...toast, { ...toastData, message: message[lang] }])
		} catch (error) {
			let message: string
			const { data } = error as AxiosResponse<ErrorDataType>

			if (data) message = data.message[lang]
			else message = error as string
			setToast([...toast, { ...toastData, message, type: 'error' }])
		} finally {
			setLoading(false)
		}
	}, [isLike, toast])

	const totalQuantity = getTotalQuantity(attributeSet)

	return (
		<div className={`card-product relative w-full cursor-pointer ${className}`}>
			<div className='card-prod-img aspect-square relative mb-1.5 lg:mb-5'>
				<div className='card-prod-layer'>
					<div className='flex items-center justify-center w-full'>
						<CartIcon
							className='mr-5  p-1 w-[28px] h-[28px] md:w-[35px] md:h-[35px]'
							onClick={handleAddToCart}
						/>
						<EyeIcon
							className='mr-5  p-1 w-[37px] h-[37px] md:w-[45px] md:h-[45px]'
							onClick={() => handleSeeDetail(product.slug)}
						/>
						<HeartIcon
							className='w-[20px] h-[20px] md:w-[25px] md:h-[25px]'
							fill={`${isLike ? 'red' : 'transparent'}`}
							stroke={`${isLike ? 'red' : 'black'}`}
							onClick={isLike ? handleRemoveFromnWishList : handleAddToWishList}
						/>
					</div>
				</div>
				<div className='relative'>
					{totalQuantity === 0 ? (
						<Badge type='sold' />
					) : (
						product.category.length !== 0 && (
							<Badge type='category' content={product.category[0].name[lang]} />
						)
					)}
				</div>
				<Image
					src={images[0]?.url || thumbnailPlaceholderUrl}
					fill
					alt={name[lang]}
					sizes='100%, (min-width: 768px) 100%'
					priority
					className='object-cover object-center rounded'
				/>
			</div>
			<h4 className='text-sm md:text-lg lg:text-[20px] mb-1 truncate-1 '>
				{name[lang]}
			</h4>
			<div className='flex items-center flex-wrap'>
				{special_price && (
					<p className='mr-2 text-error line-through'>${original_price}</p>
				)}
				<p className='text-sm md:text-lg lg:text-[20px] text-primary'>
					${special_price ? special_price.price : original_price}
				</p>
			</div>
		</div>
	)
}

export default CardProduct
