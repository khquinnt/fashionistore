import React, { useRef } from 'react'
import ChevronDown from '../../../icons/ChevronDown'

type AccordionLayoutProps = {
	title: string
	children: React.ReactNode | string
	index: number
	activeIndex: number
	setActiveIndex: React.Dispatch<React.SetStateAction<number>>
}

function AccordionLayout({
	title,
	children,
	index,
	setActiveIndex,
	activeIndex
}: AccordionLayoutProps) {
	const accordionItemRef = useRef<HTMLDivElement>(null)

	const handleSetIndex = () => {
		if (accordionItemRef) {
			const accordionContent = accordionItemRef.current
			const classList = Array.from(accordionContent?.classList || [])

			let accordionMaxHeight = accordionContent?.style.maxHeight
			if (accordionContent) {
				if (
					accordionMaxHeight === '0px' ||
					!accordionMaxHeight ||
					classList.includes('hide')
				) {
					accordionContent.style.maxHeight = `${
						accordionContent.scrollHeight + 30
					}px`
				} else {
					accordionContent.style.maxHeight = `0px`
				}
			}
		}
		return activeIndex !== index ? setActiveIndex(index) : setActiveIndex(0)
	}

	return (
		<>
			<div
				className={`transition w-full rounded ${
					activeIndex === index
						? 'border-b border-line rounded-bl-none rounded-br-none last:border-b-0'
						: ''
				}`}
			>
				<div
					className={`cursor-pointer transition flex px-2 items-center h-12 justify-between ${
						activeIndex === index
							? 'bg-primary text-white rounded'
							: 'hover:bg-primary/[.2]'
					}`}
					onClick={handleSetIndex}
				>
					<p>{title}</p>
					<ChevronDown
						className={`${
							activeIndex === index && '-rotate-180'
						} transition-all ease-linear duration-300 select-none`}
					/>
				</div>
				<div
					ref={accordionItemRef}
					className={`accordion-content px-2 pt-0 overflow-hidden max-h-0 ${
						activeIndex !== index ? 'hide' : ''
					}`}
				>
					<div className='py-3'>{children}</div>
				</div>
			</div>
		</>
	)
}

export default AccordionLayout
