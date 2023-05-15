import { useCallback, useEffect, useMemo } from 'react'
import { useRecoilState } from 'recoil'
import { toastState } from '../../../recoil/atoms/toast.'
import { ToastStatusType } from '../../../types/common'
import CheckIcon from '../../icons/CheckIcon'
import CrossIcon from '../../icons/CrossIcon'
import InforIcon from '../../icons/InforIcon'

type ToastPropsType = {
	type?: ToastStatusType
	children: string
	id: string
}

function Toast({ type = 'check', children, id }: ToastPropsType) {
	const [toast, setToast] = useRecoilState(toastState)
	const DURATION_TO_REMOVE = 2000

	const handleRemoveToast = useCallback(() => {
		const newToast = toast.filter((x) => x.id !== id)
		setToast([...newToast])
	}, [toast, setToast])

	useEffect(() => {
		let intervalID: ReturnType<typeof setInterval> = setInterval(() => {
			if (toast.length) {
				handleRemoveToast()
			}
		}, DURATION_TO_REMOVE)

		return () => {
			clearInterval(intervalID)
		}
	}, [handleRemoveToast, toast])

	const bgToast = useMemo(() => {
		switch (type) {
			case 'error':
				return `bg-error/40`
			case 'infor':
				return `bg-infor/40`
			case 'warning':
				return `bg-warning/40`

			default:
				return `bg-check/40`
		}
	}, [type])

	const bgIconToast = useMemo(() => {
		switch (type) {
			case 'error':
				return `bg-error`
			case 'infor':
				return `bg-infor`
			case 'warning':
				return `bg-warning`

			default:
				return `bg-check`
		}
	}, [type])

	const iconType = {
		check: (
			<CheckIcon strokeWidth='3' width='20' height={20} stroke='#3fbd60' />
		),
		error: (
			<CrossIcon strokeWidth='3' width='20' height={20} stroke='#ec4d2c' />
		),
		infor: (
			<InforIcon strokeWidth='3' width='20' height={20} stroke='#006de5' />
		),
		warning: (
			<InforIcon strokeWidth='3' width='20' height={20} stroke='#ee9500' />
		)
	}

	return (
		<div
			className={`toast relative flex items-center gap-2 bg-white min-w-fit max-w-full md:max-w-fit p-1.5 pr-4 rounded-xl`}
		>
			<div
				className={`min-w-[30px] md:min-w-[40px] h-[30px] md:h-10 flex items-center justify-center rounded-2xl ${bgIconToast}`}
			>
				<div className='bg-white rounded-full p-1'>{iconType[type]}</div>
			</div>

			<p
				className={`line-clamp-2 lg:line-clamp-1 text-sm md:text-base flex-1 md:flex-auto`}
			>
				{children}
			</p>
			<div className='ml-3 cursor-pointer' onClick={handleRemoveToast}>
				<CrossIcon />
			</div>
			<div
				className={`absolute left-0 right-0 h-full -z-10 rounded-xl ${bgToast}`}
			></div>
		</div>
	)
}

export default Toast
