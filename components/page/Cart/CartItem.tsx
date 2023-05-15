import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { LangEnum } from '../../../types/common'
import { ProductSchema } from '../../../types/product'
import { AttributeSetCart } from '../../../types/user'
import {
	shimmer,
	thumbnailPlaceholderUrl,
	toBase64
} from '../../../utils/common'
import QuantityInput from '../../common/QuantityInput'

export type ValueAddToCart = {
	quantity: number
	id: string
	price: number
	attribute: AttributeSetCart[]
}

type CartItemPropsType = {
	product: ProductSchema
	attribute: { key: string; value: string; quantity: number }[]
	quantity: number
	handleAddToCart: (value: ValueAddToCart) => Promise<void>
}

function CartItem({
	product,
	attribute,
	quantity,
	handleAddToCart
}: CartItemPropsType) {
	const { _id, name, original_price, images } = product

	const { t } = useTranslation('common')
	const lang = useTranslation('common').lang as LangEnum

	const [quantityByAttr, setQuantityByAttr] = useState(quantity)

	function handleKeyDown(event: React.KeyboardEvent<HTMLFormElement>) {
		if (event.keyCode === 13) {
			event.preventDefault()
		}
	}

	const methods = useForm({
		defaultValues: {
			quantity,
			id: _id,
			price: original_price,
			attribute
		}
	})

	const quantityWatch = methods.watch('quantity')

	useEffect(() => {
		const arrQuantity = attribute.map((item) => item.quantity)
		const countQuantityByAttr = Math.min(...arrQuantity)

		setQuantityByAttr(countQuantityByAttr)
	}, [])

	return (
		<div className='mb-8'>
			<div className='flex gap-[1.5rem]'>
				<div className='w-32 h-32 relative'>
					<Image
						alt={name[lang]}
						src={images[0]?.url || thumbnailPlaceholderUrl}
						fill
						sizes='100%'
						priority
						placeholder='blur'
						className='object-cover object-center rounded'
						blurDataURL={`data:image/svg+xml;base64,${toBase64(
							shimmer(700, 475)
						)}`}
					/>
				</div>
				<div className='flex-1 flex flex-col justify-between'>
					<p className='text-base line-clamp-2'>{name[lang]}</p>
					<div className='mt-1'>
						{attribute.map((attr, idx) => {
							return (
								<p className='text-sm text-black/50' key={idx}>
									{attr.key}: {attr.value}
								</p>
							)
						})}
					</div>
				</div>
			</div>
			<FormProvider {...methods}>
				<form className='flex gap-[1.5rem]' onKeyDown={(e) => handleKeyDown(e)}>
					<div className='w-32'>
						<QuantityInput
							disabled
							max={quantityByAttr}
							quantityWatch={quantityWatch}
							handleSubmitOnChange={methods.handleSubmit(handleAddToCart)}
						/>
					</div>
					<div className='flex-1 flex flex-col justify-center items-end'>
						<p className='font-semibold'>${quantityWatch * original_price}</p>
					</div>
				</form>
			</FormProvider>
		</div>
	)
}

export default CartItem
