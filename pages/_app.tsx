import type { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'
import { RecoilRoot } from 'recoil'
import Loading from '../components/common/Loading'
import ToastContainer from '../components/common/Toast/ToastContainer'
import '../styles/globals.css'
import { NextPageWithLayout } from '../types'
import { initiateAxios } from '../utils/initAxios'

initiateAxios()

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((page) => page)
	return (
		<RecoilRoot>
			<Head>
				<title>Fashionistore</title>
				<meta name='description' content='Generated by create next app' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0'
				></meta>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<React.Fragment>
				<Loading />
				<ToastContainer />
				<div
					className='fixed 
					z-[999]
					bottom-[10px] bg-sky-500  h-[30px] w-[70px] rounded border border-black/[.3] left-[5px]'
				>
					<div className='h-full w-full text-sm text-white font-bold flex items-center justify-center  after:absolute after:content-["xs"] sm:after:content-["sm"] md:after:content-["md"] lg:after:content-["lg"] xl:after:content-["xl"] 2xl:after:content-["2xl"] '></div>
				</div>
				{getLayout(<Component {...pageProps} />)}
			</React.Fragment>
		</RecoilRoot>
	)
}
