import { useFormContext, useWatch } from 'react-hook-form'
import QuantityInput from '../../common/QuantityInput'

type QuantityFieldProps = {
	quantity: number
}

function QuantityField({ quantity }: QuantityFieldProps) {
	const { control } = useFormContext()
	const quantityWatch = useWatch({ control, name: 'quantity' })

	return (
		<>
			<p className='mt-4'>Số lượng</p>
			<div className='flex items-center justify-between gap-5 flex-wrap'>
				<QuantityInput
					disabledButton
					max={quantity}
					quantityWatch={quantityWatch}
				/>
				<div className=''>{quantity} sản phẩm có sẵn</div>
			</div>
		</>
	)
}

export default QuantityField
