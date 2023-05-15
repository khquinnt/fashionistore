import { useRecoilState } from 'recoil'
import { searchOpenState } from '../../../recoil/atoms/search'
import React from 'react'

function SearchIcon({ className }: { className?: string }) {
	const [openSearchState, setSearchState] = useRecoilState(searchOpenState)

	const handleOpenSearch = React.useCallback(() => {
		setSearchState(!openSearchState)
	}, [])

	return (
		<div className={`cursor-pointer ${className}`} onClick={handleOpenSearch}>
			<img src='/images/search.svg' alt='Search' className='w-[25px] lg:ml-2' />
		</div>
	)
}

export default SearchIcon
