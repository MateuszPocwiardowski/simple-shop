import { Fragment } from 'react'
import Head from 'next/head'

import ItemDetails from '@Components/ItemDetails/ItemDetails'
import RecommendedItems from '@Components/RecommendedItems/RecommendedItems'
import { getBaseURL } from '@Utils/db'

import styles from '@Styles/Items.module.css'

const Item = ({ item, category, recommendedItems }) => {
	return (
		<Fragment>
			<Head>
				<title>So simple shop</title>
				<meta name='description' content={`${item.description}`} />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className={styles.items}>
				<ItemDetails item={item} />
				<RecommendedItems category={category} items={recommendedItems} />
			</main>
		</Fragment>
	)
}

export default Item

export const getStaticPaths = async () => {
	const baseURL = getBaseURL()

	const res = await fetch(`${baseURL}/api/items`)
	const { items } = await res.json()

	return {
		fallback: 'blocking',
		paths: items.map(item => ({
			params: { id: item?._id.toString() },
		})),
	}
}

export const getStaticProps = async context => {
	const id = context.params.id

	const res = await fetch(`http://localhost:3000/api/items/${id}`)
	const { item, recommendedItems } = await res.json()

	return {
		props: {
			item: {
				...item,
				_id: null,
				id: item._id.toString(),
			},

			recommendedItems: recommendedItems.map(item => ({
				id: item._id.toString(),
				title: item.title,
				price: item.price,
				images: item.images,
			})),

			category: item.category.toLowerCase(),
		},
		revalidate: 60,
	}
}
