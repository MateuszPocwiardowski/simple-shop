import { useState } from 'react'

import Item from './Item/Item'
import Button from '@Components/common/Button/Button'

import styles from './Items.module.css'

const DESCRIPTION = `Our collection includes luxury candles that will set the mood for any occasion, stylish furniture pieces that
will transform your home, and high-performance MacBooks that will boost your productivity. Our candles come in a
variety of scents, ranging from refreshing citrus to warm vanilla, and are made with high-quality ingredients.
Our furniture pieces are crafted with the finest materials and designed to elevate any space with their elegance
and functionality. Shop with us today and discover the perfect addition to your luxurious lifestyle.`

const Items = ({ items }) => {
	const [indexOfLastItem, setIndexOfLastItem] = useState(4)

	const handleShowMoreItems = () => {
		setIndexOfLastItem(prevState => prevState + 4)
	}

	const visibleItems = items.slice(0, indexOfLastItem)

	return (
		<section className={styles.items}>
			<h3 className={styles.title}>Our products</h3>
			<p className={styles.description}>{DESCRIPTION}</p>
			<div className={styles.cards}>
				{visibleItems.map(({ id, title, price, images }) => (
					<Item key={id} id={id} title={title} price={price} images={images} />
				))}
			</div>
			<Button type='text' sx={{ alignSelf: 'center' }} onClick={handleShowMoreItems}>
				Show more
			</Button>
		</section>
	)
}

export default Items
