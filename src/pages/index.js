import { Fragment } from 'react'
import Head from 'next/head'
import { MongoClient } from 'mongodb'

import Hero from '@Components/Hero/Hero'
import Items from '@Components/Items/Items'
import Banner from '@Components/Banner/Banner'

import styles from '@Styles/Home.module.css'

const Home = ({ items }) => {
	return (
		<Fragment>
			<Head>
				<title>So simple shop</title>
				<meta
					name='description'
					content="Welcome to so.simple.shop! We are your one-stop-shop for fancy products. Our products are of the highest quality and we pride ourselves on offering exceptional customer service. With a wide variety of products to choose from, you're sure to find something you love. Don't miss out on our latest occasion. Order now and enjoy fast, reliable shipping. Visit us today and discover why so.simple.shop is the best fancy shop around!"
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className={styles.main}>
				<Hero />
				<Items items={items} />
				<Banner />
			</main>
		</Fragment>
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
