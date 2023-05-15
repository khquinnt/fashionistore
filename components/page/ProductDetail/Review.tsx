import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'
import Router from 'next/router'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import * as yup from 'yup'
import { loadingOpenState } from '../../../recoil/atoms/loading'
import { userState } from '../../../recoil/atoms/user'
import { addReview } from '../../../services/product'
import { RatingType } from '../../../types/product'
import { ButtonHover } from '../../common/Button'
import Pagination from '../../common/Pagination'
import StarRating from '../../common/StarRating'
import TextAreaField from '../../hook-form/TextAreaField'

const LIMIT_REVIEW = 4

function Review({
	productId,
	rating,
	active = false
}: {
	productId: string
	rating: RatingType[]
	active?: boolean
}) {
	// TODO: Loadmore in review part
	const [page, setPage] = useState<number>(1)

	function handleOnPageChange(page: number) {
		setPage(page)
	}

	return (
		<section className='relative flex flex-col lg:flex-row lg:justify-between gap-10 '>
			<div className='relative lg:min-w-[50%]'>
				{rating.length === 0 ? (
					<p className='font-semibold text-lg'>There are no reviews yet.</p>
				) : (
					<div>
						<p className='text-lg font-semibold'>
							{rating.length} reviews for this product
						</p>

						<div className='mt-5 lg:mt-10 flex flex-col gap-6'>
							{rating
								.slice(LIMIT_REVIEW * (page - 1), LIMIT_REVIEW * page)
								.map((reviewer, index) => {
									return (
										<React.Fragment key={index}>
											<div
												className={`flex gap-4 pb-5 items-center ${
													index + 1 !==
														rating.slice(
															LIMIT_REVIEW * (page - 1),
															LIMIT_REVIEW * page
														).length && 'border-b border-line'
												}`}
											>
												<div className='relative min-h-[50px] min-w-[50px] self-start'>
													<Image
														src='/images/userAvaPlaceholder.jpg'
														alt={
															reviewer.postedBy
																? reviewer.postedBy.lastname
																: 'Unknown'
														}
														fill
													/>
												</div>
												<div className='flex flex-col gap-1 w-full'>
													<StarRating width={20} totalRating={reviewer.star} />
													<p className='font-semibold'>
														{reviewer.postedBy
															? `${reviewer.postedBy.firstname} ${reviewer.postedBy.lastname}`
															: 'Unknown'}
													</p>

													<div className='mt-2 text-base'>
														{reviewer.comment}
													</div>
												</div>
											</div>
										</React.Fragment>
									)
								})}
						</div>
					</div>
				)}
				{rating.length > 5 && (
					<Pagination
						limit={LIMIT_REVIEW}
						total={rating.length}
						currentPage={page}
						onPageChange={handleOnPageChange}
					/>
				)}
			</div>

			<div className='mt-10 lg:mt-0 pb-5 lg:w-[150%] lg:sticky right-0 top-[100px] h-full'>
				<ReviewForm active={active} productId={productId} />
			</div>
		</section>
	)
}

export type AddReviewType = {
	star: number
	comment: string
	postedBy: string
}

function ReviewForm({
	active,
	productId
}: {
	productId: string
	active: boolean
}) {
	const user = useRecoilValue(userState)
	const setLoading = useSetRecoilState(loadingOpenState)

	const schema = yup.object({
		star: yup.number().min(1, 'Phaiải dđanánh giaá'),
		comment: yup.string().required('Phai nhap review')
	})
	const methods = useForm<AddReviewType>({
		defaultValues: {
			star: 0,
			comment: ''
		},
		resolver: yupResolver(schema)
	})

	const {
		setValue,
		getValues,
		watch,
		formState: { errors },
		clearErrors,
		reset
	} = methods

	function refreshData() {
		Router.replace(Router.asPath)
		setLoading(true)
	}

	const watchStar = watch('star')
	useEffect(() => {
		if (watchStar !== 0) clearErrors('star')
	}, [watchStar])

	useEffect(() => {
		clearErrors()
	}, [active])

	async function handleSubmit(values: AddReviewType) {
		setLoading(true)
		try {
			const newRating = await addReview(productId, {
				...values,
				postedBy: user!._id
			})

			if (newRating) {
				refreshData()
				reset()
			}
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<React.Fragment>
			<h1 className='font-semibold text-lg border-line border-b lg:border-0 pb-2'>
				Write review
			</h1>

			{user ? (
				<FormProvider {...methods}>
					<form className='mt-5 ' onSubmit={methods.handleSubmit(handleSubmit)}>
						<div className='flex flex-col gap-1'>
							<p>Your rating</p>
							<div className='px-[2px]'>
								<StarRating
									totalRating={getValues('star')}
									width={20}
									canEdit
									handleRating={(star) => setValue('star', star)}
								/>
							</div>
							{errors.star && (
								<p className='text-[13px] ml-2 text-error'>
									{errors.star.message}
								</p>
							)}
							<p className='mt-4'>Your review</p>
							<TextAreaField name='comment' />
						</div>
						<ButtonHover
							text='Add review'
							type='submit'
							childClassName='uppercase text-sm text-primary font-semibold'
							className={`text-primary mt-7 text-center border-[1.5px] rounded border-primary py-2 px-2.5`}
						/>
					</form>
				</FormProvider>
			) : (
				<p className='mt-4 lg:mt-1'>Vui lòng đăng nhập để viết review</p>
			)}
		</React.Fragment>
	)
}

export default Review
