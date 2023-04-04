import { useState, useEffect } from 'react'

import useIsInView from '@Hooks/useInView'
import Item from '../Item/Item'

import styles from './ItemList.module.css'

const DESCRIPTION = `Our collection includes luxury candles that will set the mood for any occasion, stylish furniture pieces that
will transform your home, and high-performance MacBooks that will boost your productivity. Our candles come in a
variety of scents, ranging from refreshing citrus to warm vanilla, and are made with high-quality ingredients.
Our furniture pieces are crafted with the finest materials and designed to elevate any space with their elegance
and functionality. Shop with us today and discover the perfect addition to your luxurious lifestyle.`

const ItemList = ({ items }) => {
	const [indexOfLastItem, setIndexOfLastItem] = useState(4)

	const { ref, inView } = useIsInView({ threshold: 1 })

	useEffect(() => {
		if (inView && items.length > indexOfLastItem) {
			setIndexOfLastItem(prevState => prevState + 4)
		}
	}, [inView])

	const visibleItems = items.slice(0, indexOfLastItem)

	return (
		<section className={styles.items}>
			<h3 className={styles.title} id='products'>
				Our products
			</h3>
			<p className={styles.description}>{DESCRIPTION}</p>
			<div className={styles.cards}>
				{visibleItems.map(({ id, title, price, images }) => (
					<Item key={id} id={id} title={title} price={price} images={images} />
				))}
			</div>
			<div ref={ref}></div>
		</section>
	)
}

export default ItemList
