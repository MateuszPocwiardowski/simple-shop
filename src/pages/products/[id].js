import { useState, useEffect, useContext } from 'react'
import CartContext from '@Store/cart-context'
import Link from 'next/link'
import { MongoClient, ObjectId } from 'mongodb'
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ProductSlide from '@Components/Products/Product/Product'

import Stock from '@Components/Stock/Stock'
import toCurrency from '@Utils/toCurrency'

import styles from '@Styles/Product.module.css'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

const Product = ({
	id,
	title,
	description,
	price,
	brand,
	quantity,
	category,
	code,
	images,
	otherProductFromCategory,
}) => {
	const cartCtx = useContext(CartContext)

	const [orderQuantity, setOrderQuantity] = useState(1)
	const [orderQuote, setOrderQuote] = useState(price)

	const increaseOrderQuantityHandler = () => {
		setOrderQuantity(prevState => prevState + 1)
	}

	const decreaseOrderQuantityHandler = () => {
		setOrderQuantity(prevState => (prevState > 1 ? prevState - 1 : prevState))
	}

	const addToBasketHandler = () => {
		cartCtx.addItemToCart({ id, title, quantity: orderQuantity, price: orderQuote })
	}

	useEffect(() => {
		setOrderQuote(price * orderQuantity)
	}, [orderQuantity, price])

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
					<div className={styles.stock}>
						<p className={styles.code}>Product code: {code}</p>
						<Stock stock={quantity} />
					</div>

					<p>{description}</p>

					<div className={styles.quantity}>
						<button onClick={increaseOrderQuantityHandler}>+</button>
						<p>{orderQuantity}</p>
						<button onClick={decreaseOrderQuantityHandler}>-</button>
					</div>

					<p className={styles.price}>{toCurrency(orderQuote)}</p>

					<div className={styles.buttons}>
						<button className={styles.button} onClick={addToBasketHandler} disabled={quantity === 0}>
							Add to basket
						</button>
						<button className={styles.button} onClick={addToBasketHandler} disabled={quantity === 0}>
							Shop now
						</button>
					</div>
				</div>
			</div>

			<div className={styles.otherProducts}>
				<h5>Other products from {category.toLowerCase()}</h5>
				<div className={styles.otherProductsCarousel}>
					<Swiper
						className={styles.swiper}
						slidesPerView={1.5}
						spaceBetween={20}
						breakpoints={{
							576: {
								slidesPerView: 2.5,
							},
							768: {
								slidesPerView: 3.5,
							},
						}}
						pagination={{ clickable: true }}>
						{otherProductFromCategory.map(({ id, title, price, images }) => (
							<SwiperSlide key={title}>
								<ProductSlide id={id} title={title} price={price} images={images} />
							</SwiperSlide>
						))}
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

	const selectedItemId = context.params.id

	const db = client.db()
	const productsCollection = db.collection('products')

	const { _id, title, description, price, brand, quantity, category, code, images } = await productsCollection.findOne({
		_id: new ObjectId(selectedItemId),
	})

	const otherProductFromCategory = await productsCollection.find({ category: category }).toArray()

	client.close()

	return {
		props: {
			id: _id.toString(),
			title,
			description,
			price,
			brand,
			quantity,
			category,
			code,
			images,

			otherProductFromCategory: otherProductFromCategory.map(item => ({
				id: item._id.toString(),
				title: item.title,
				price: item.price,
				images: item.images,
			})),
		},
	}
}
