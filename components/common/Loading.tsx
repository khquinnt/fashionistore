import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { loadingOpenState } from '../../recoil/atoms/loading'

function Loading() {
	const [loading, setLoading] = useRecoilState(loadingOpenState)
	const router = useRouter()
	const { lang } = useTranslation()

	useEffect(() => {
		const handleStart = (url: string) => {
			return url !== router.asPath && setLoading(true)
		}
		const handleComplete = (url: string) => {
			if (typeof url === 'string') {
				if (url.includes(lang)) url = url.replace(lang, '')
				if (url.includes('//')) url = url.replace('//', '/')

				return url === router.asPath && setLoading(false)
			}
		}

		router.events.on('routeChangeStart', handleStart)
		router.events.on('routeChangeComplete', handleComplete)
		router.events.on('routeChangeError', handleComplete)

		return () => {
			router.events.off('routeChangeStart', handleStart)
			router.events.off('routeChangeComplete', handleComplete)
			router.events.off('routeChangeError', handleComplete)
		}
	})

	return (
		<>
			{loading && (
				<div
					className='fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center'
					style={{
						background: 'radial-gradient(circle,#fff,hsla(0,0%,100%,.8))'
					}}
				>
					<span className='loading-spinner'></span>
				</div>
			)}
		</>
	)
}

export default Loading
