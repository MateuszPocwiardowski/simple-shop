import { Swiper, SwiperSlide } from 'swiper/react'

import ItemSlide from '@Components/Item/Item'

import styles from './RecommendedItems.module.css'
import 'swiper/css'
import 'swiper/css/scrollbar'

const RecommendedItems = ({ category, items }) => {
	return (
		<div className={styles.items}>
			<h5 className={styles.title}>
				Recommended items from <strong>{category}</strong> category
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
					}}>
					{items.map(({ id, title, price, images }) => (
						<SwiperSlide key={title}>
							<ItemSlide id={id} title={title} price={price} images={images} />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	)
}

export default RecommendedItems
