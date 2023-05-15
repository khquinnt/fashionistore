import { AxiosResponse } from 'axios'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import useGetID from '../../../../hooks/useGetID'
import { loadingOpenState } from '../../../../recoil/atoms/loading'
import { toastState } from '../../../../recoil/atoms/toast.'
import { userState } from '../../../../recoil/atoms/user'
import { addToWishList, removeFromWishList } from '../../../../services/user'
import { ErrorDataType, LangEnum, ToastType } from '../../../../types/common'
import { ProductSchema } from '../../../../types/product'
import { getTotalQuantity } from '../../../../utils/common'
import { copyToClickBoard } from '../../../../utils/copyToClipBoard'
import Button from '../../../common/Button'
import StarRating from '../../../common/StarRating'
import HeartIcon from '../../../icons/HeartIcon'
import ShareIcon from '../../../icons/ShareIcon'
import Form from './Form'

type InfoSectionProps = {
	product: ProductSchema
}

function InfoSection({ product }: InfoSectionProps) {
	const {
		name,
		original_price,
		special_price,
		images,
		rating,
		quantity,
		category,
		attributeSet,
		_id
	} = product

	const lang = useTranslation('common').lang as LangEnum
	const [readMore, setReadMore] = useState<boolean>(false)
	const [isLike, setIsLike] = useState<boolean>(false)

	const setLoading = useSetRecoilState(loadingOpenState)
	const [user, setUser] = useRecoilState(userState)
	const [toast, setToast] = useRecoilState(toastState)
	const router = useRouter()

	useEffect(() => {
		if (!user) setIsLike(false)
		else if (user.wishList.includes(_id)) {
			setIsLike(true)
		}
	}, [user?.wishList])

	const toggleReadMore = () => {
		setReadMore(!readMore)
	}

	const toastData = {
		message: '',
		type: 'check',
		id: useGetID()
	} as ToastType

	const likeProduct = async () => {
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
	}

	const unlikeProduct = async () => {
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
	}

	const totalRating = useMemo(() => {
		const total = rating.reduce((pre, current) => {
			const star = pre + current.star
			return star
		}, 0)

		return Math.round(total / rating.length)
	}, [rating])

	const totalQuantity = getTotalQuantity(attributeSet)

	return (
		<section className='mt-6 lg:mt-0 lg:flex lg:flex-col'>
			<div className=''>
				<h2 className='text-xl lg:text-2xl'>{name[lang]}</h2>
				<div className='flex justify-between items-center mt-6'>
					<p className='text-primary text-lg lg:text-xl mt-1'>
						${original_price}
					</p>
					<div className='flex'>
						<Button
							title='Add to favorite'
							onClick={isLike ? unlikeProduct : likeProduct}
						>
							<HeartIcon
								fill={`${isLike ? 'red' : 'transparent'}`}
								stroke={`${isLike ? 'red' : 'black'}`}
								className='w-[23px] h-[23px]'
							/>
						</Button>
						<Button
							title='Copy'
							className='ml-3'
							onClick={() => copyToClickBoard(window?.location?.href)}
						>
							<ShareIcon className='aspect-square h-6' />
						</Button>
					</div>
				</div>
				<div className='mt-3 lg:mt-5 flex items-center justify-between flex-wrap gap-2'>
					<StarRating totalRating={totalRating} />
					<p className='text-secondary text-base'>
						{rating.length} customer review
					</p>
				</div>
			</div>

			<div className='flex flex-col lg:flex-col-reverse lg:justify-between lg:flex-1'>
				<div className=''>
					<Form
						original_price={original_price}
						special_price={special_price}
						proId={_id}
						quantity={quantity | totalQuantity}
						attributeSet={attributeSet}
					/>
					<div className='flex items-center mt-6'>
						<p className='text-base mr-2'>Categories:</p>
						<div className='flex items-center'>
							{category.map((c, idx) => {
								return (
									<Link
										href={`/c/${c.slug}`}
										className='mr-2 group'
										key={c.slug}
									>
										<p className='text-secondary '>
											<span className='group-hover:underline'>
												{c.name[lang]}
											</span>
											<span>{idx !== category.length - 1 && ','}</span>
										</p>
									</Link>
								)
							})}
						</div>
					</div>
				</div>

				<div className={`mt-4`}>
					<div
						className={`${readMore ? '' : 'line-clamp-3'} lg:line-clamp-3 `}
						title={product.shortDesc || product.description[lang]}
					>
						{product.shortDesc || product.description[lang]}
					</div>

					{/* <Button
						className='mt-2 text-primary text-base flex items-center group lg:hidden'
						onClick={toggleReadMore}
					>
						<p className='group-hover:underline'>
							{readMore ? 'Show less' : 'Read more'}
						</p>
						<ChevronRight className='w-4 h-4 mt-[2px]' />
					</Button> */}
				</div>
			</div>
		</section>
	)
}

export default InfoSection
