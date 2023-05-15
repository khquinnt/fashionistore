import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Mousewheel, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { shimmer, toBase64 } from '../../../utils/common'

type ImageSectionProps = {
	img: { url: string }[]
	productName: {
		en: string
		vi: string
	}
}

function ImageSection({ img, productName }: ImageSectionProps) {
	const { lang } = useTranslation('common')
	const lgImgRef = useRef<HTMLDivElement>(null)
	const prodName = lang === 'en' ? productName.en : productName.vi
	const [lgImg, setLgImg] = useState<string>(img[0].url)

	const handleChangeImg = (src: string) => {
		setLgImg(src)

		if (lgImgRef.current?.classList.contains('animate-fade')) {
			lgImgRef.current?.classList.replace(
				'animate-fade',
				'animate-fade-reverse'
			)
		} else if (lgImgRef.current?.classList.contains('animate-fade-reverse')) {
			lgImgRef.current?.classList.replace(
				'animate-fade-reverse',
				'animate-fade'
			)
		}
	}

	useEffect(() => {
		lgImgRef.current?.classList.add('animate-fade')
		lgImgRef.current?.classList.remove('opacity-0')
	}, [])

	useEffect(() => {
		setLgImg(img[0].url)
	}, [img])

	return (
		<section className='flex flex-col md:flex-row-reverse md:justify-center gap-2 md:gap-6 md:h-[600px] lg:h-[650px]'>
			<div
				ref={lgImgRef}
				className='h-[400px] md:h-[600px] lg:h-full relative border rounded md:w-full opacity-0'
			>
				<Image
					src={lgImg}
					alt={prodName}
					fill
					priority
					className='object-cover'
					placeholder='blur'
					blurDataURL={`data:image/svg+xml;base64,${toBase64(
						shimmer(700, 475)
					)}`}
				/>
			</div>
			<div className='h-[100px] w-full md:h-full lg:h-full md:w-[150px]'>
				<Swiper
					className='product-carousel h-full md:h-full'
					draggable
					mousewheel
					modules={[Navigation, Mousewheel]}
					navigation
					cssMode
					breakpoints={{
						0: {
							direction: 'horizontal',
							slidesPerView: 2,
							spaceBetween: 20
						},
						300: {
							direction: 'horizontal',
							slidesPerView: 3,
							spaceBetween: 20
						},
						768: {
							direction: 'vertical',
							mousewheel: true,
							slidesPerView: 5,
							spaceBetween: 20
						},
						1024: {
							direction: 'vertical',
							mousewheel: true,
							slidesPerView: 5,
							spaceBetween: 20
						}
					}}
				>
					{img.map((img, idx) => {
						return (
							<SwiperSlide
								key={idx}
								className='rounded border cursor-pointer'
								onClick={
									img.url !== lgImg ? () => handleChangeImg(img.url) : undefined
								}
							>
								<Image
									src={img.url}
									alt={`${productName} - ${idx + 1}`}
									fill
									className='object-cover object-center'
									sizes='100%'
									priority
									placeholder='blur'
									blurDataURL={`data:image/svg+xml;base64,${toBase64(
										shimmer(700, 475)
									)}`}
								/>
							</SwiperSlide>
						)
					})}
				</Swiper>
			</div>
		</section>
	)
}

export default ImageSection
