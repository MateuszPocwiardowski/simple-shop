import React from 'react'
import Link from 'next/link'
import { MongoClient, ObjectId } from 'mongodb'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import styles from '@Styles/Product.module.css'

const Product = ({ brand, title, description, price, quantity, category, code }) => {
	const formatter = new Intl.NumberFormat('pl-PL', {
		style: 'currency',
		currency: 'PLN',
	})

	return (
		<div className={styles.product}>
			<Link className={styles.link} href='/'>
				<ArrowBackIcon sx={{ fontSize: 18 }} />
				Go back
			</Link>
			<div className={styles.details}>
				<div className={styles.container}>
					<h5 className={styles.title}>{title}</h5>
					<p className={styles.brand}>{brand}</p>
				</div>
				<div className={styles.carousel}>
					<img src='' alt='Product image' />
				</div>
				<div className={styles.manage}>
					<p className={styles.code}>Product code: {code}</p>
					<p className={styles.description}>{description}</p>
					<p className={styles.price}>{formatter.format(Number(price))}</p>
				</div>
			</div>
		</div>
	)
}

export default Product

export const getStaticPaths = async () => {
	const client = await MongoClient.connect(
		'mongodb+srv://mpocwiardowski:tnmLqEI56WyjzMJU@cluster0.vlusofg.mongodb.net/cars?retryWrites=true&w=majority'
	)

	const db = client.db()
	const productsCollection = db.collection('products')
	const products = await productsCollection.find().toArray()

	client.close()

	return {
		fallback: 'blocking',
		paths: products.map(product => ({
			params: { id: product?._id.toString() },
		})),
	}
}

export const getStaticProps = async context => {
	const client = await MongoClient.connect(
		'mongodb+srv://mpocwiardowski:tnmLqEI56WyjzMJU@cluster0.vlusofg.mongodb.net/cars?retryWrites=true&w=majority'
	)

	const db = client.db()
	const productsCollection = db.collection('products')

	const selectedId = context.params.id
	const selectedProduct = await productsCollection.findOne({ _id: new ObjectId(selectedId) })

	client.close()

	return {
		props: {
			...selectedProduct,
			_id: null,
			id: selectedProduct?._id.toString(),
		},
	}
}
