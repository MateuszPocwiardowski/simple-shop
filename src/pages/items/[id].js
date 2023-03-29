import { useState, useEffect, useContext } from 'react'
import CartContext from '@Store/cart-context'
import Link from 'next/link'
import { MongoClient, ObjectId } from 'mongodb'
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import Wishlist from '@Components/Wishlist/Wishlist'
import Button from '@Components/common/Button/Button'
import ItemSlide from '@Components/Items/Item/Item'
import Stock from '@Components/Stock/Stock'
import toCurrency from '@Utils/toCurrency'

import styles from '@Styles/Items.module.css'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

const Item = ({ item, recommendedItems }) => {
	const cartCtx = useContext(CartContext)

	const [quantity, setQuantity] = useState(1)
	const [price, setPrice] = useState(item.price)

	const increaseQuantityHandler = () => {
		setQuantity(prevState => prevState + 1)
	}

	const decreaseQuantityHandler = () => {
		setQuantity(prevState => (prevState > 1 ? prevState - 1 : prevState))
	}

	const addToCartHandler = () => {
		cartCtx.addItemToCart({ id: item.id, title: item.title, quantity, price: item.price })
	}

	useEffect(() => {
		setPrice(item.price * quantity)
	}, [quantity, item.price])

	const noStock = item.quantity === 0

	return (
		<div className={styles.items}>
			<Link className={styles.link} href='/'>
				<ArrowBackIcon sx={{ fontSize: 18 }} />
				Go back
			</Link>

			<div className={styles.titleContainer}>
				<h5 className={styles.title}>{item.title}</h5>
				<p>{item.brand}</p>
			</div>

			<div className={styles.swiperContainer}>
				<Swiper
					className={styles.swiper}
					modules={[Pagination]}
					spaceBetween={0}
					slidesPerView={1}
					pagination={{ clickable: true }}>
					{item.images.length > 0 &&
						item.images.map(image => (
							<SwiperSlide key={image}>
								<img className={styles.image} src={image} alt={item.title} />
								<Wishlist item={item} />
							</SwiperSlide>
						))}
				</Swiper>
			</div>

			<div className={styles.detailsContainer}>
				<div className={styles.details}>
					<p className={styles.productCode}>Product code: {item.code}</p>
					<Stock stock={item.quantity} />
				</div>

				<p>{item.description}</p>

				<div className={styles.manageQuantity}>
					<button onClick={increaseQuantityHandler}>+</button>
					<p>{quantity}</p>
					<button onClick={decreaseQuantityHandler}>-</button>
				</div>

				<p className={styles.price}>{toCurrency(price)}</p>

				<div className={styles.buttons}>
					<Button type='contained' onClick={addToCartHandler} disabled={noStock}>
						Add to cart
					</Button>
					<Button type='contained-inverted' onClick={addToCartHandler} disabled={noStock}>
						Shop now
					</Button>
				</div>
			</div>

			<div className={styles.recommendedItems}>
				<h5 className={styles.title}>
					Recommended items from <strong>{item.category.toLowerCase()}</strong> category
				</h5>
				<div className={styles.swiperContainer}>
					<Swiper
						className={styles.swiper}
						slidesPerView={1.5}
						spaceBetween={20}
						breakpoints={{
							576: {
								slidesPerView: 2.5,
							},
							768: {
								slidesPerView: 4.5,
							},
						}}
						pagination={{ clickable: true }}>
						{recommendedItems.map(({ id, title, price, images }) => (
							<SwiperSlide key={title}>
								<ItemSlide id={id} title={title} price={price} images={images} />
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</div>
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
		},
	}
}
