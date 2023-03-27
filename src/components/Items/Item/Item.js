import { useRouter } from 'next/router'

import Wishlist from '@Components/Wishlist/Wishlist'
import toCurrency from '@Utils/toCurrency'

import styles from './Item.module.css'

const Item = ({ id, title, price, images }) => {
	const router = useRouter()

	const showDetailsHandler = () => {
		router.push('/items/' + id)
	}

	return (
		<div className={styles.card} role='button' onClick={showDetailsHandler}>
			<img className={styles.image} src={images[0]} alt={title} />

			<Wishlist item={{ id, title, price, images }} />

			<p className={styles.title}>{title}</p>
			<p className={styles.price}>{toCurrency(price)}</p>
		</div>
	)
}

export default Item
