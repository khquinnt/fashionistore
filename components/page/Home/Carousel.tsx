import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { Autoplay, Pagination, Scrollbar } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import { loadingOpenState } from '../../../recoil/atoms/loading'
import { newestProduct } from '../../../services/product'
import { ProductSchema } from '../../../types/product'
import { thumbnailPlaceholderUrl } from '../../../utils/common'
import Button from '../../common/Button'

function Carousel() {
	const [newProduct, setNewProduct] = useState<ProductSchema[]>([])
	const { lang } = useTranslation()
	const setLoading = useSetRecoilState(loadingOpenState)

	async function fetchNewestProducts() {
		setLoading(true)
		try {
			const newestProducts = await newestProduct()
			setNewProduct(newestProducts)
		} catch (error) {
			console.log('error: ', error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchNewestProducts()
	}, [])

	const pagination = {
		clickable: true,
		renderBullet: function (index: any, className: any) {
			return '<span class="' + className + '">' + '</span>'
		}
	}

	return (
		<div className='min-h-[300px] lg:min-h-[600px] mb-6 '>
			<Swiper
				autoplay={{
					delay: 5000
				}}
				spaceBetween={10}
				speed={1500}
				pagination={pagination}
				modules={[Pagination, Autoplay]}
				grabCursor
				className='bg-white rounded-md'
				loop
				onInit={(swiper) => {
					swiper.slideTo(1)
				}}
				draggable
			>
				{newProduct.map((p, idx) => {
					const productName = lang === 'en' ? p.name.en : p.name.vi
					return (
						<SwiperSlide key={idx} className='h-[300px]'>
							<div
								style={{
									backgroundImage: `url(${
										p.images[0]?.url || thumbnailPlaceholderUrl
									})`
								}}
								className={` h-[300px] lg:h-[600px] rounded-md bg-center lg:bg-center bg-cover bg-clip-border bg-no-repeat relative`}
							>
								<div className='h-full w-full bg-gradient-to-r  from-black/[.6] '></div>
								<div className='min-w-[50%] max-w-[70%] md:max-w-[50%] text-white font-semibold absolute bottom-[15%] lg:bottom-[unset] lg:top-[50%] lg:-translate-y-1/2 lg:left-[5%] p-3'>
									<h1
										className='text-xl font-bold lg:text-4xl truncate'
										title={productName}
									>
										{productName}
									</h1>
									<p className='text-lg lg:text-3xl mb-6 text-thin lg:mb-12'>
										{`$${p.original_price}`}
									</p>
									<Link href={`/p/${p.slug}`}>
										<Button className='border-white  hover:text-black hover:bg-white transition-all duration-[200ms] border-2 lg:border-[3px] px-4 lg:px-10 py-2 lg:py-4 rounded'>
											View Product
										</Button>
									</Link>
								</div>
							</div>
						</SwiperSlide>
					)
				})}
			</Swiper>
		</div>
	)
}

export default Carousel
