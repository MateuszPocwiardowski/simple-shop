import Head from 'next/head'
import { MongoClient } from 'mongodb'

import Hero from '@Components/Hero/Hero'
import Products from '@Components/Products/Products'
import Tip from '@Components/Tip/Tip'

import styles from '@Styles/Home.module.css'

const Home = ({ products }) => {
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name='description' content='' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className={styles.main}>
				<Hero />
				<Products products={products} />
				<Tip />
			</main>
		</>
	)
}

export default Home

export const getStaticProps = async context => {
	const client = await MongoClient.connect(
		'mongodb+srv://mpocwiardowski:tnmLqEI56WyjzMJU@cluster0.vlusofg.mongodb.net/cars?retryWrites=true&w=majority'
	)

	const db = client.db()
	const productsCollection = db.collection('products')
	const products = await productsCollection.find().toArray()

	client.close()

	return {
		props: {
			products: products.map(product => ({
				...product,
				_id: null,
				id: product._id.toString(),
			})),
		},
		revalidate: 1,
	}
}
