import React, { memo, useState } from 'react'
import StartIcon from '../icons/StartIcon'

type StarRatingPropsType = {
	totalRating: number
	width?: number
	canEdit?: boolean
	handleRating?: (star: number) => void
}

function StarRating({
	totalRating,
	width = 25,
	canEdit = false,
	handleRating
}: StarRatingPropsType) {
	const [hoverRating, setHoverRating] = useState<number>(0)
	function handleChangeRating(star: number) {
		if (handleRating) handleRating(star)
	}

	function getColor(star: number) {
		if (canEdit) {
			if (hoverRating >= star)
				return '#A18A68' // 5 sao -> đang hover ở sao n thì sẽ sáng từ sao 1 -> sao n
			else if (!hoverRating && totalRating >= star) return '#A18A68' // Nếu đã chọn sao -> khi không hover thì sẽ sáng từ sao 1 đến sao đã chọn (n)
		} else {
			if (totalRating >= star) return '#A18A68'
		}
	}

	return (
		<div className='flex items-center mr-3 -ml-1'>
			{Array.from({ length: 5 }).map((_, idx) => {
				return (
					<StartIcon
						key={idx}
						className='cursor-pointer'
						width={width}
						height={width}
						fill={getColor(idx + 1)}
						stroke='#A18A68'
						onClick={canEdit ? () => handleChangeRating(idx + 1) : undefined}
						onMouseEnter={canEdit ? () => setHoverRating(idx + 1) : undefined}
						onMouseLeave={canEdit ? () => setHoverRating(0) : undefined}
					/>
				)
			})}
		</div>
	)
}

export default StarRating
