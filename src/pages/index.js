import Head from 'next/head'
import { MongoClient } from 'mongodb'

import Hero from '@Components/Hero/Hero'
import Items from '@Components/Items/Items'
import Banner from '@Components/Banner/Banner'

import styles from '@Styles/Home.module.css'

const Home = ({ items }) => {
	return (
		<>
			<Head>
				<title>So simple shop</title>
				<meta name='description' content='' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className={styles.main}>
				<Hero />
				<Items items={items} />
				<Banner />
			</main>
		</>
	)
}

export default Home

export const getStaticProps = async () => {
	const client = await MongoClient.connect(
		'mongodb+srv://mpocwiardowski:tnmLqEI56WyjzMJU@cluster0.vlusofg.mongodb.net/cars?retryWrites=true&w=majority'
	)

	const db = client.db()
	const itemsCollection = db.collection('products')
	const items = await itemsCollection.find().toArray()

	client.close()

	return {
		props: {
			items: items.map(({ _id, ...keys }) => ({
				id: _id.toString(),
				...keys,
			})),
		},
		revalidate: 1,
	}
}
