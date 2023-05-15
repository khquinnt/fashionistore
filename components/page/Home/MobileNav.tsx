import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getAllCategories } from '../../../services/category'
import { CategorySchema } from '../../../types/category'

function MobileNav() {
	const [categories, setCategories] = useState<CategorySchema[]>([])
	const { lang } = useTranslation()

	useEffect(() => {
		fetchAllCategories()
	}, [])

	async function fetchAllCategories() {
		try {
			const categories = await getAllCategories()
			setCategories(categories)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<ul className='mb-6 flex lg:hidden overflow-x-auto max-w-full mobile-nav'>
			{categories?.map((category, idx) => {
				const name = lang === 'en' ? category.name.en : category.name.vi

				return (
					<li
						key={idx}
						className='inline-block mr-2 shrink-0 rounded max-w-[200px] min-h-12 text-gray-900 bg-white border border-gray-300 hover:bg-gray-100   dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600'
					>
						<Link
							href={`/c/${category.slug}`}
							className='w-full h-full py-3 px-10 flex items-center '
						>
							<p className='truncate-1'>{name}</p>
						</Link>
					</li>
				)
			})}
		</ul>
	)
}

export default MobileNav
