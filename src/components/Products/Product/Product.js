import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import styles from './Product.module.css'

const Product = ({ images, title, price }) => {
	const formatter = new Intl.NumberFormat('pl-PL', {
		style: 'currency',
		currency: 'PLN',
	})

	return (
		<div className={styles.product}>
			<div className={styles.carousel}>
				<img className={styles.image} src={images[0]} alt={title} />
			</div>
			<p className={styles.title}>{title}</p>
			<p className={styles.price}>{formatter.format(Number(price))}</p>
		</div>
	)
}

export default Product
