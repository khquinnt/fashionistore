import { useFormContext, useWatch } from 'react-hook-form'
import { AttributeListType } from '../../../types/product'
import { ButtonHover } from '../../common/Button'

type AttributeProps = {
	attributeSet: AttributeListType[]
}

function Attribute({ attributeSet }: AttributeProps) {
	const { setValue, getValues } = useFormContext()
	const watchAttribute = useWatch({ name: 'attribute' })

	function handleChoose(
		value: { key: string; value: string; quantity: number },
		idx: number
	) {
		const newAttr = [...getValues(`attribute`)]
		newAttr[idx] = value

		setValue('attribute', newAttr)
	}

	return (
		<div>
			{attributeSet.map((attrList, idx) => {
				return (
					<div className='flex flex-col gap-1 my-5 lg:my-2' key={idx}>
						<p className='min-w-[70px] py-1'>{`${attrList.key}: `}</p>
						<div className='flex flex-wrap gap-2'>
							{attrList.value.map((value, i) => {
								const choosen = {
									key: attrList.key,
									value,
									quantity: attrList.quantity[i]
								}
								return (
									<ButtonHover
										active={watchAttribute[idx].value === value}
										key={i}
										className={`px-2 md:px-3 py-1 border border-primary text-primary rounded text-sm md:text-base`}
										text={value}
										disabled={attrList.quantity[i] === 0}
										onClick={
											!(watchAttribute[idx].value === value)
												? () => handleChoose(choosen, idx)
												: () => {}
										}
									/>
								)
							})}
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default Attribute
