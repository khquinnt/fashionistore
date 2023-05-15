import React, { useEffect, useState } from 'react'
import Button from '../../components/common/Button'
import CardProduct from '../../components/common/CardProduct'
import Pagination from '../../components/common/Pagination'
import FilterIcon from '../../components/icons/FilterIcon'
import Layout from '../../components/Layout'
import { NextPageWithLayout } from '../../types'

const dummyData = [
	{
		name: 'Lira Earrings',
		price: '$ 20,00',
		src: '/images/product/Img01.png',
		id: '1'
	},
	{
		name: 'Ollie Earrings',
		price: '$ 30,00',
		src: '/images/product/Img02.png',
		id: '2'
	},
	{
		name: 'Kaede Hair Pin',
		price: '$ 30,00',
		src: '/images/product/Img03.png',
		id: '3'
	},
	{
		name: 'Yuki Hair Pin',
		price: '$ 29,00',
		src: '/images/product/Img04.png',
		id: '4'
	},
	{
		name: 'Plaine Necklace',
		price: '$ 22,00',
		src: '/images/product/Img05.png',
		id: '5'
	},
	{
		name: 'Hair Pin Set of 3',
		price: '$ 12,00',
		src: '/images/product/Img06.png',
		id: '6'
	},
	{
		name: 'Lira Earrings',
		price: '$ 20,00',
		src: '/images/product/Img01.png',
		id: '1'
	},
	{
		name: 'Ollie Earrings',
		price: '$ 30,00',
		src: '/images/product/Img02.png',
		id: '2'
	},
	{
		name: 'Kaede Hair Pin',
		price: '$ 30,00',
		src: '/images/product/Img03.png',
		id: '3'
	},
	{
		name: 'Yuki Hair Pin',
		price: '$ 29,00',
		src: '/images/product/Img04.png',
		id: '4'
	},
	{
		name: 'Plaine Necklace',
		price: '$ 22,00',
		src: '/images/product/Img05.png',
		id: '5'
	},
	{
		name: 'Hair Pin Set of 3',
		price: '$ 12,00',
		src: '/images/product/Img06.png',
		id: '6'
	}
]

const Category: NextPageWithLayout = () => {
	const [data, setData] = useState(dummyData)
	const [page, setPage] = useState<number>(1)
	const LIMIT = 4

	useEffect(() => {
		const lastIndex = page * LIMIT
		const firstIndex = lastIndex - LIMIT
		const filterData = dummyData.slice(firstIndex, lastIndex)
		setData(filterData)
	}, [page])
	const handleOnPageChange = (page: number) => {
		setPage(page)
	}

	return (
		<div className='container mx-auto p-2.5'>
			<h1 className='text-xl font-semibold mb-4'>Category</h1>
			<Button className='group'>
				<div className='flex items-center text-primary group-hover:text-secondary'>
					<FilterIcon
						className='mr-2 w-full h-full'
						classPath='fill-primary stroke-primary group-hover:fill-secondary group-hover:stroke-secondary'
						width={20}
						height={20}
					/>
					<p className='text-lg lg:text-xl'>Filters</p>
				</div>
			</Button>
			<div className='mt-3 lg:mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 lg:gap-y-10'>
				{data.map((prod, idx) => {
					return <CardProduct product={prod} key={idx} />
				})}
			</div>
			<Pagination
				total={dummyData.length}
				limit={LIMIT}
				onPageChange={handleOnPageChange}
				currentPage={page}
			/>
		</div>
	)
}

Category.getLayout = (page) => <Layout>{page}</Layout>

export const getStaticProps = () => ({ props: {} })
export default Category
