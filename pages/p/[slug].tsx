import { GetStaticPropsContext } from 'next'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import 'swiper/css'
import 'swiper/css/navigation'
import Layout from '../../components/Layout'
import Button from '../../components/common/Button'
import ChevronRight from '../../components/icons/ChevronRight'
import Accordion from '../../components/page/ProductDetail/Accordion/Accordion'
import ImageSection from '../../components/page/ProductDetail/ImageSection'
import InfoSection from '../../components/page/ProductDetail/Info/InfoSection'
import SimilarItems from '../../components/page/ProductDetail/SimilarItems'
import Tab from '../../components/page/ProductDetail/Tab/Tab'
import { loadingOpenState } from '../../recoil/atoms/loading'
import {
	getAllProduct,
	getDetailProduct,
	getRelatedProduct
} from '../../services/product'
import { NextPageWithLayout } from '../../types'
import { ProductSchema } from '../../types/product'

type ProductDetailPropsType = {
	product: ProductSchema
	relatedProduct: []
}

const ProductDetail: NextPageWithLayout<ProductDetailPropsType> = ({
	product,
	relatedProduct
}) => {
	const setLoading = useSetRecoilState(loadingOpenState)

	useEffect(() => {
		setLoading(false)
	}, [product, relatedProduct])

	return (
		<section className='container mx-auto px-2.5 relative'>
			<div className='grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] lg:gap-10 xl:gap-16 2xl:gap-20 lg:auto-rows-[1fr]'>
				<ImageSection img={product.images} productName={product.name} />
				<InfoSection product={product} />
			</div>
			<div className='mt-4 py-4 border border-line border-l-0 border-r-0 lg:border-0'>
				<Accordion product={product} />
				<Tab product={product} />
			</div>
			<div className='mt-4 py-4'>
				<SimilarItems relatedProduct={relatedProduct} />
			</div>
		</section>
	)
}

ProductDetail.getLayout = (page: React.ReactElement) => (
	<Layout pageName=''>{page}</Layout>
)

export async function getStaticPaths() {
	try {
		const listProduct = await getAllProduct(50)

		const paths = listProduct.data.map((item: ProductSchema) => ({
			params: { slug: item.slug.toString() }
		}))
		return {
			paths,
			fallback: false
		}
	} catch (error) {
		console.error(error)
		return {
			paths: [],
			fallback: false
		}
	}
}

export async function getStaticProps(context: GetStaticPropsContext) {
	const slug = context.params?.slug

	try {
		if (slug) {
			const product = await getDetailProduct(slug.toString())
			const relatedProduct = await getRelatedProduct(slug.toString())

			if (product && relatedProduct)
				return {
					props: { product, relatedProduct }
				}
			else {
				return {
					props: { product: {}, relatedProduct: [] }
				}
			}
		}
	} catch (error) {
		console.error(error)
	}
}

// export async function getServerSideProps(context: NextPageContext) {
// 	try {
// 		const { slug } = context.query

// 		if (slug) {
// 			const product = await getDetailProduct(slug.toString())
// 			const relatedProduct = await getRelatedProduct(slug.toString())

// 			if (product && relatedProduct)
// 				return {
// 					props: { product, relatedProduct }
// 				}
// 			else {
// 				return {
// 					props: { product: {}, relatedProduct: [] }
// 				}
// 			}
// 		}
// 	} catch (error) {
// 		console.error(error)
// 	}
// }

export default ProductDetail
