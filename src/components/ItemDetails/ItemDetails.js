import { useState, useEffect, useContext, Fragment } from 'react'
import CartContext from '@Store/cart-context'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'

import Wishlist from '@Components/Wishlist/Wishlist'
import Button from '@Components/common/Button/Button'
import Stock from '@Components/Stock/Stock'
import toCurrency from '@Utils/toCurrency'

import styles from './ItemDetails.module.css'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

const ItemDetails = ({ item }) => {
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

	const formattedPrice = toCurrency(price)

	return (
		<Fragment>
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

				<div className={styles.quantityContainer}>
					<button onClick={increaseQuantityHandler}>+</button>
					<p>{quantity}</p>
					<button onClick={decreaseQuantityHandler}>-</button>
				</div>

				<p className={styles.price}>{formattedPrice}</p>

				<div className={styles.buttons}>
					<Button type='contained' onClick={addToCartHandler} disabled={noStock}>
						Add to cart
					</Button>
					<Button type='contained-inverted' onClick={addToCartHandler} disabled={noStock}>
						Shop now
					</Button>
				</div>
			</div>
		</Fragment>
	)
}

export default ItemDetails
