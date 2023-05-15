import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getAllCategories } from '../../../services/category'
import { CategorySchema } from '../../../types/category'
import { LangEnum } from '../../../types/common'
import { thumbnailPlaceholderUrl } from '../../../utils/common'
import { ButtonHover } from '../../common/Button'

const titleStyle = `uppercase whitespace-pre-wrap text-center text-primary font-[500] text-center text-xl tracking-[.3rem] lg:text-2xl `
const layerText = `opacity-0 group-hover:opacity-100  group-hover:bottom-0 bg-black/[.2] absolute bottom-[100%] -top-1 left-0 right-0 py-2 h-auto z-10 flex items-center justify-center text-center text-white font-bold text-xl sm:text-base px-2`

function CategoryExplore() {
	const [categories, setCategories] = useState<CategorySchema[]>([])
	const { t } = useTranslation()
	const lang = useTranslation().lang as LangEnum

	useEffect(() => {
		fetchAllCategories()
	}, [])

	async function fetchAllCategories() {
		try {
			const categories = await getAllCategories()
			setCategories(categories.slice(0, 3))
		} catch (error) {
			console.log(error)
		} finally {
		}
	}
	return (
		<section className=''>
			<div className='container mx-auto px-6 sm:px-2.5 py-10 lg:py-14'>
				<h2 className={titleStyle}>Explore our pieces</h2>
				<div className='py-10 grid grid-cols-1 grid-rows-3 sm:grid-cols-3 sm:grid-rows-1 place-content-center gap-5 md:gap-10 xl:gap-12'>
					{categories.map((c, idx) => {
						return (
							<Link
								href={`/c/${c.slug}`}
								className={`relative aspect-[9/14] xl:aspect-[9/13] w-full group transition-all overflow-hidden`}
								key={c._id}
							>
								<div
									className={layerText}
									style={{
										transition: 'all .35s cubic-bezier(.02,.29,.89,.69)'
									}}
								>
									{c.name[lang]}
								</div>
								<Image
									className='object-cover '
									fill
									alt={c.name[lang]}
									src={c.images[0].url ?? thumbnailPlaceholderUrl}
								/>
							</Link>
						)
					})}
				</div>
				<Link href='/p' className='flex justify-center'>
					<ButtonHover
						text='View all products'
						className='uppercase px-10 py-4 border border-primary w-full tracking-widest text-primary text-sm sm:px-12 py-3 sm:w-auto'
					/>
				</Link>
			</div>
		</section>
	)
}

export default CategoryExplore
