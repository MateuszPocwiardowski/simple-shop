import { Fragment } from 'react'
import Head from 'next/head'
import { MongoClient, ObjectId } from 'mongodb'

import ItemDetails from '@Components/ItemDetails/ItemDetails'
import RecommendedItems from '@Components/RecommendedItems/RecommendedItems'

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
	const client = await MongoClient.connect(
		'mongodb+srv://mpocwiardowski:tnmLqEI56WyjzMJU@cluster0.vlusofg.mongodb.net/cars?retryWrites=true&w=majority'
	)

	const db = client.db()
	const itemsCollection = db.collection('products')
	const items = await itemsCollection.find().toArray()

	client.close()

	return {
		fallback: 'blocking',
		paths: items.map(product => ({
			params: { id: product?._id.toString() },
		})),
	}
}

export const getStaticProps = async context => {
	const client = await MongoClient.connect(
		'mongodb+srv://mpocwiardowski:tnmLqEI56WyjzMJU@cluster0.vlusofg.mongodb.net/cars?retryWrites=true&w=majority'
	)

	const { id: selectedId } = context.params

	const db = client.db()
	const itemsCollection = db.collection('products')

	const item = await itemsCollection.findOne({
		_id: new ObjectId(selectedId),
	})

	const recommendedItems = await itemsCollection.find({ category: item.category }).toArray()

	client.close()

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
	}
}
