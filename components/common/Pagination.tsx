import React, { useState } from 'react'
import { usePagination } from '../../hooks/usePagination'
import ChevronLeft from '../icons/ChevronLeft'
import ChevronRight from '../icons/ChevronRight'
import Button from './Button'

type PaginationProps = {
	total: number
	limit?: number
	onPageChange: (page: number) => void
	className?: string
	currentPage: number
}

function Pagination({
	total,
	limit = 5,
	onPageChange,
	currentPage
}: PaginationProps) {
	const paginationRange =
		usePagination({
			currentPage: currentPage,
			pageSize: limit,
			total: total
		}) || []

	const handleChangePage = (page: number) => {
		onPageChange(page)
	}

	return (
		<div className='mt-5'>
			<div className='flex gap-2 justify-center'>
				<Button
					className={`flex items-center justify-center  min-w-[32px] md:min-h-[40px] md:min-w-[40px] lg:min-h-[48px] lg:min-w-[48px] rounded border border-[#d8d8d8] ${
						currentPage === 1 && 'hidden'
					}`}
					onClick={() => handleChangePage(currentPage - 1)}
				>
					<ChevronLeft className='w-4' />
				</Button>
				<div className='flex justify-center flex-wrap gap-2'>
					{paginationRange &&
						paginationRange.map((page, idx) => {
							return (
								<Button
									className={`min-h-[32px] min-w-[32px] md:min-h-[40px] md:min-w-[40px] lg:min-h-[48px] lg:min-w-[48px] text-sm lg:text-lg rounded border border-[#d8d8d8] ${
										currentPage === page && 'text-white bg-black border-none'
									}`}
									onClick={() => handleChangePage(page)}
									key={idx}
									disabled={page === -1}
								>
									{page === -1 ? '...' : page}
								</Button>
							)
						})}
				</div>
				<Button
					className={`flex items-center justify-center min-h-8 max-h-8 min-w-[32px] md:min-h-[40px] md:min-w-[40px] lg:min-h-[48px] lg:min-w-[48px]  rounded border border-[#d8d8d8] ${
						paginationRange.at(-1) === currentPage && 'hidden'
					}`}
					onClick={() => handleChangePage(currentPage + 1)}
				>
					<ChevronRight className='w-4' />
				</Button>
			</div>
		</div>
	)
}

export default Pagination
