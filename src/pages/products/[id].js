import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MongoClient, ObjectId } from 'mongodb'
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import styles from '@Styles/Product.module.css'

const Product = ({ products, brand, title, description, price, quantity, category, code, images }) => {
	const [quantityOrder, setQuantityOrder] = useState(1)
	const [quoteOrder, setQuoteOrder] = useState(price)

	const formatter = new Intl.NumberFormat('pl-PL', {
		style: 'currency',
		currency: 'PLN',
	})

	const increaseQuantityOrderHandler = () => {
		setQuantityOrder(prevState => prevState + 1)
	}

	const decreaseQuantityOrderHandler = () => {
		setQuantityOrder(prevState => (prevState > 1 ? prevState - 1 : prevState))
	}

	useEffect(() => {
		setQuoteOrder(price * quantityOrder)
	}, [quantityOrder, price])

	return (
		<div className={styles.product}>
			<Link className={styles.link} href='/'>
				<ArrowBackIcon sx={{ fontSize: 18 }} />
				Go back
			</Link>

			<div className={styles.details}>
				<div className={styles.title}>
					<h5>{title}</h5>
					<p>{brand}</p>
				</div>

				<div className={styles.container}>
					<Swiper
						className={styles.swiper}
						modules={[Pagination]}
						spaceBetween={0}
						slidesPerView={1}
						pagination={{ clickable: true }}>
						{images.length > 0 &&
							images.map(image => (
								<SwiperSlide key={image}>
									<img className={styles.image} src={image} alt={title} />
								</SwiperSlide>
							))}
					</Swiper>
				</div>

				<div className={styles.manage}>
					<p className={styles.code}>Product code: {code}</p>
					<p>{description}</p>

					<div className={styles.quantity}>
						<button onClick={increaseQuantityOrderHandler}>+</button>
						<p>{quantityOrder}</p>
						<button onClick={decreaseQuantityOrderHandler}>-</button>
					</div>

					<p className={styles.price}>{formatter.format(Number(quoteOrder))}</p>

					<div className={styles.buttons}>
						<button className={styles.button}>Add to basket</button>
						<button className={styles.button}>Shop now</button>
					</div>
				</div>
			</div>

			<div className={styles.otherProducts}>
				<h5>Other products from {category.toLowerCase()}</h5>
				<div>
					<Swiper
						className={styles.swiper}
						spaceBetween={0}
						slidesPerView={3}
						pagination={{ clickable: true }}
						scrollbar={{ clickable: true }}>
						<SwiperSlide></SwiperSlide>
					</Swiper>
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
	const products = await productsCollection.find().toArray()

	const selectedId = context.params.id
	const selectedProduct = await productsCollection.findOne({ _id: new ObjectId(selectedId) })

	client.close()

	return {
		props: {
			products: products.map(product => ({
				...product,
				_id: null,
				id: product._id.toString(),
			})),

			...selectedProduct,
			_id: null,
			id: selectedProduct?._id.toString(),
		},
	}
}
