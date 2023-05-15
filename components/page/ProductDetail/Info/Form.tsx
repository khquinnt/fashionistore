import { yupResolver } from '@hookform/resolvers/yup'
import { AxiosResponse } from 'axios'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { useRecoilState, useSetRecoilState } from 'recoil'
import * as yup from 'yup'
import useGetID from '../../../../hooks/useGetID'
import { loadingOpenState } from '../../../../recoil/atoms/loading'
import { toastState } from '../../../../recoil/atoms/toast.'
import { userState } from '../../../../recoil/atoms/user'
import { addToCart } from '../../../../services/user'
import { ErrorDataType, LangEnum, ToastType } from '../../../../types/common'
import { AttributeListType, SpecialPriceType } from '../../../../types/product'
import { ButtonHover } from '../../../common/Button'
import Attribute from '../Attribute'
import QuantityField from '../QuantityField'
import { AttributeSetCart } from '../../../../types/user'

type FormProps = {
	proId: string
	quantity: number
	attributeSet: AttributeListType[]
	original_price: number
	special_price: SpecialPriceType
}

const toastData = {
	message: '',
	type: 'check',
	id: useGetID()
} as ToastType

function Form({
	quantity,
	attributeSet,
	proId,
	original_price,
	special_price
}: FormProps) {
	const lang = useTranslation('common').lang as LangEnum
	const [quantityByAttr, setQuantityByAttr] = useState(quantity)

	const setLoading = useSetRecoilState(loadingOpenState)
	const [user, setUser] = useRecoilState(userState)
	const [toast, setToast] = useRecoilState(toastState)

	const router = useRouter()

	const schema = yup.object({
		quantity: yup.number().max(quantity, 'Max quantity available')
	})

	const defaultAttr = useMemo(() => {
		return attributeSet.map((attrList) => {
			const firstAvailable = attrList.quantity.filter((quan) => quan !== 0)[0]
			const index = attrList.quantity.indexOf(firstAvailable)
			return {
				key: attrList.key,
				value: attrList.value[index],
				quantity: attrList.quantity[index]
			}
		})
	}, [attributeSet])

	const methods = useForm({
		defaultValues: {
			quantity: 1,
			attribute: defaultAttr,
			price: original_price
		},
		resolver: yupResolver(schema)
	})

	const handleAddToCart = async (value: {
		quantity: number
		price: number
		attribute: AttributeSetCart[]
	}) => {
		if (!user) return router.push('/login')

		setLoading(true)
		try {
			const message = {
				en: 'Added to cart.',
				vi: 'Đã thêm vào giỏ hàng'
			}
			const result = await addToCart(proId, value)
			setUser({ ...user, cart: result.cart })
			setToast([
				...toast,
				{ ...toastData, message: message[lang], type: 'check' }
			])
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

	useEffect(() => {
		const arrQuantity = methods
			.getValues('attribute')
			.map((item) => item.quantity)
		const countQuantityByAttr = Math.min(...arrQuantity)

		setQuantityByAttr(countQuantityByAttr)
	}, [useWatch({ control: methods.control, name: 'attribute' })])

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(handleAddToCart)} noValidate>
				{quantityByAttr === 0 ? (
					<p className='text-red-500 mt-4'>Sản phẩm hiện đang hết hàng</p>
				) : (
					<>
						<Attribute attributeSet={attributeSet} />
						<QuantityField quantity={quantityByAttr} />
					</>
				)}

				<ButtonHover
					fullWidth
					className={`${
						quantityByAttr === 0 && 'hidden'
					} mt-7 text-center border-[1.5px] rounded border-primary p-2.5`}
					childClassName='uppercase text-sm text-primary font-semibold'
					text='Add to cart'
					type='submit'
				/>
			</form>
		</FormProvider>
	)
}

export default Form
