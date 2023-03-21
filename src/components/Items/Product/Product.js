import { useRouter } from 'next/router'

import toCurrency from '@Utils/toCurrency'

import styles from './Product.module.css'

const Product = ({ id, title, price, images }) => {
	const router = useRouter()

	const showDetailsHandler = () => {
		router.push('/products/' + id)
	}

	return (
		<div className={styles.card} role='button' onClick={showDetailsHandler}>
			<img className={styles.image} src={images[0]} alt={title} />
			<p className={styles.title}>{title}</p>
			<p className={styles.price}>{toCurrency(price)}</p>
		</div>
	)
}

export default Product
