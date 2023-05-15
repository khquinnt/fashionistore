import dynamic from 'next/dynamic'
import Layout from '../components/Layout'
import NewIn from '../components/page/Home/NewIn'
import { NextPageWithLayout } from '../types'
import Loading from '../components/common/Loading'

const CarouselSection = dynamic(
	() => import('../components/page/Home/Carousel'),
	{
		loading: () => <Loading />
	}
)
const HotestProductSection = dynamic(
	() => import('../components/page/Home/HostestProduct'),
	{
		loading: () => <Loading />
	}
)
const CategoryExploreSection = dynamic(
	() => import('../components/page/Home/CategoryExplore'),
	{
		loading: () => <Loading />
	}
)

const Home: NextPageWithLayout = (props) => {
	return (
		<>
			<div className='container mx-auto px-2.5 w-auto'>
				<CarouselSection />
			</div>
			<div className='container mx-auto px-2.5 w-auto'>
				<HotestProductSection />
			</div>
			<NewIn />
			<CategoryExploreSection />
		</>
	)
}

Home.getLayout = (page) => <Layout>{page}</Layout>

export const getStaticProps = () => ({ props: {} })

export default Home
