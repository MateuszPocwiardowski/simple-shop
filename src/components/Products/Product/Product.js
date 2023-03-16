import { useRouter } from 'next/router'

import styles from './Product.module.css'

const Product = ({ id, title, price, images }) => {
	const router = useRouter()

	const showDetailsHandler = () => {
		router.push('/products/' + id)
	}

	const formatter = new Intl.NumberFormat('pl-PL', {
		style: 'currency',
		currency: 'PLN',
	})

	return (
		<div className={styles.card} role='button' onClick={showDetailsHandler}>
			<img className={styles.image} src={images[0]} alt={title} />
			<p className={styles.title}>{title}</p>
			<p className={styles.price}>{formatter.format(Number(price))}</p>
		</div>
	)
}

export default Product
