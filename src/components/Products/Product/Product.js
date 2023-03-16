import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'
import styles from './Product.module.css'

const Product = ({ images, title, price }) => {
	const formatter = new Intl.NumberFormat('pl-PL', {
		style: 'currency',
		currency: 'PLN',
	})

	return (
		<div className={styles.card}>
			<Swiper
				className={styles.swiper}
				modules={[Pagination]}
				spaceBetween={0}
				slidesPerView={1}
				pagination={{ clickable: true }}>
				{images.length > 0 &&
					images.map((image, index) => (
						<SwiperSlide className={styles.slide}>
							<img className={styles.image} src={image} alt={title} />
						</SwiperSlide>
					))}
			</Swiper>
			<p className={styles.title}>{title}</p>
			<p className={styles.price}>{formatter.format(Number(price))}</p>
		</div>
	)
}

export default Product
