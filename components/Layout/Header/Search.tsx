import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { FormProvider, UseFormReturn, useForm, useWatch } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import { searchOpenState } from '../../../recoil/atoms/search'
import { SearchValueType } from '../../../types/search'
import Button from '../../common/Button'
import TextField from '../../hook-form/TextField'

function Search() {
	const [openSearchState, setOpenSearchState] = useRecoilState(searchOpenState)
	const [recentSearch, setRecentSearch] = useState<string[]>([])

	function saveKeyword(k: string) {
		if (!k) return
		let newRecent = [...recentSearch]
		let keyword = k.trim()

		newRecent.unshift(keyword)

		setRecentSearch((preState) => [keyword, ...preState])
		window.localStorage.setItem('recent_search', JSON.stringify(newRecent))
	}

	useEffect(() => {
		const history: string[] = JSON.parse(
			window.localStorage.getItem('recent_search') || '[]'
		)

		setRecentSearch(history)
	}, [])

	const methods = useForm<SearchValueType>({
		defaultValues: {
			search: ''
		}
	})

	useEffect(() => {
		if (openSearchState) handleClearSearch()
	}, [openSearchState])

	const handleCloseSearch = React.useCallback(() => {
		setOpenSearchState(false)
	}, [])

	const handleClearSearch = React.useCallback(() => {
		methods.setValue('search', '')
	}, [])

	const handleSearch = React.useCallback(
		(value: SearchValueType) => {
			if (!recentSearch.includes(value.search)) {
				saveKeyword(value.search)
			}
			// Call API search here
			console.log('🚀 ~ file: Search.tsx:38 ~ handleSearch ~ value', value)
			handleClearSearch()
		},
		[recentSearch]
	)

	return (
		<React.Fragment>
			{openSearchState && (
				<React.Fragment>
					<div
						className={`z-10 fixed h-full bottom-0 right-0 left-0 bg-[rgba(0,0,0,.8)] duration-1000 curor-pointer ${
							openSearchState && 'animate-zoom-in'
						}`}
						style={{
							background: 'radial-gradient(circle,#fff,hsla(0,0%,100%,.8))'
						}}
						onClick={handleCloseSearch}
					></div>
					<div className='container mx-auto w-full relative z-10'>
						<div className='fixed top-[40%] left-[50%] -translate-x-2/4 -translate-y-2/4 w-auto max-w-[550px] min-w-[80%] lg:min-w-[550px]'>
							<div
								className={`absolute flex bg-white rounded-lg h-[56px] w-full animate-zoom-in`}
							>
								<FormProvider {...methods}>
									<form
										className='search-form w-full flex'
										onSubmit={methods.handleSubmit(handleSearch)}
									>
										<SearchInput
											recentSearch={recentSearch}
											methods={methods}
											setRecentSearch={setRecentSearch}
											handleClearSearch={handleClearSearch}
										/>
										<Button
											type='submit'
											className='p-[10px] px-[14px] flex items-center duration-200 cursor-pointer border-[.1px] border-l-0 rounded-tr-lg rounded-br-lg border-stone-400'
										>
											<img
												src='/images/search.svg'
												alt='Search'
												className='w-[25px] '
											/>
										</Button>
									</form>
								</FormProvider>
							</div>
						</div>
						<div
							className='w-12 h-12 cursor-pointer bg-black flex items-center justify-center rounded-[50%]  absolute right-0 top-[-5px] md:top-[5px] translate-y-2/3 -translate-x-1/3'
							onClick={handleCloseSearch}
						>
							<span className='text-sm text-white'>Close</span>
						</div>
					</div>
				</React.Fragment>
			)}
		</React.Fragment>
	)
}

type SearchInputProps = {
	recentSearch: string[]
	setRecentSearch: React.Dispatch<React.SetStateAction<string[]>>
	methods: UseFormReturn<SearchValueType, any>
	handleClearSearch: () => void
}

const SearchInput = ({
	methods,
	handleClearSearch,
	recentSearch,
	setRecentSearch
}: SearchInputProps) => {
	const { t, lang } = useTranslation('common')
	const searchHistoryRef = useRef<HTMLDivElement>(null)
	const watchSearchValue = useWatch({
		control: methods.control,
		name: 'search'
	})

	const renderRecentSearch = React.useCallback(() => {
		if (recentSearch.length === 0)
			return <h1 className='font-semibold px-4'>Recently search</h1>
		else {
			return (
				<React.Fragment>
					<div className='flex px-4 pb-2 items-center justify-between border-b border-black/10'>
						<h1 className='font-semibold'>Recently search</h1>
						<p
							className='text-black/50 text-sm cursor-pointer'
							onClick={deleteAllKeyword}
						>
							Delete all
						</p>
					</div>
					<div className='flex flex-col gap-1'>
						{recentSearch.map((s, idx) => {
							return (
								<div
									key={idx}
									className='px-4 hover:bg-primary/10 flex justify-between items-center p-2 rounded-sm'
								>
									<Link className='flex-1 truncate' href={`/search/${s}`}>
										{s}
									</Link>
									<span
										onClick={() => deleteKeyword(s)}
										className='opacity-50 cursor-pointer text-sm font-semibold px-2'
									>
										X
									</span>
								</div>
							)
						})}
					</div>
				</React.Fragment>
			)
		}
	}, [recentSearch.length])

	function handleFocus() {
		searchHistoryRef.current!.style.display = 'block'
	}

	function deleteAllKeyword() {
		setRecentSearch([])
		window.localStorage.setItem('recent_search', JSON.stringify([]))
	}

	function deleteKeyword(k: string) {
		if (!k) return

		let newRecentSearch = recentSearch.filter((i) => i !== k)
		setRecentSearch(newRecentSearch)
		window.localStorage.setItem(
			'recent_search',
			JSON.stringify(newRecentSearch)
		)
	}

	return (
		<React.Fragment>
			<TextField
				onFocus={handleFocus}
				fullWidth
				autoComplete='off'
				placeholder={t('search-place-holder')}
				name='search'
				className={`outline-0 border-[.1px] border-stone-400 w-full rounded-none rounded-tl-lg rounded-bl-lg ${
					watchSearchValue && 'rounded-bl-none'
				} b pr-2 pl-10 py-2 text-[14px] lg:text-[18px] h-full`}
			/>

			{watchSearchValue && (
				<img
					onClick={handleClearSearch}
					src='/images/close.svg'
					alt='Close'
					className='w-[32px] cursor-pointer fill-white absolute  top-[50%] left-[5px] p-2 ml-1  -translate-y-2/4'
				/>
			)}

			<div
				ref={searchHistoryRef}
				className='hidden absolute bg-white min-h-[100px] max-h-[200px] py-4 top-[60px] rounded-bl-lg rounded-br-lg left-0 right-0 shadow-lg border border-black/25 overflow-auto'
			>
				{renderRecentSearch()}
			</div>
		</React.Fragment>
	)
}

export default Search
