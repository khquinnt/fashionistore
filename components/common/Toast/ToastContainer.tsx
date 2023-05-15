import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { toastState } from '../../../recoil/atoms/toast.'
import Toast from './Toast'

function ToastContainer() {
	const [toast, setToast] = useRecoilState(toastState)

	useEffect(() => {
		if (toast.length > 5) {
			const newToast = [...toast]
			newToast.shift()

			setToast(newToast)
		}
	}, [toast])

	return (
		<React.Fragment>
			<div
				id='toast-container'
				className='fixed rounded-xl z-10 left-2.5 right-2.5 top-20 md:top-24 md:left-[unset] md:right-10'
			>
				{toast.length !== 0 &&
					toast.map((item, idx) => (
						<Toast key={idx} type={item.type} id={item.id}>
							{item.message}
						</Toast>
					))}
			</div>
		</React.Fragment>
	)
}

export default ToastContainer
