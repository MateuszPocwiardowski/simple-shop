import { useRouter } from 'next/router'

import Product from './Product/Product'

import styles from './Products.module.css'

const Products = ({ products }) => {
	const router = useRouter()

	return (
		<section className={styles.products}>
			<h3 className={styles.title}>Products</h3>
			<p className={styles.description}>
				Our collection includes luxury candles that will set the mood for any occasion, stylish furniture pieces that
				will transform your home, and high-performance MacBooks that will boost your productivity. Our candles come in a
				variety of scents, ranging from refreshing citrus to warm vanilla, and are made with high-quality ingredients.
				Our furniture pieces are crafted with the finest materials and designed to elevate any space with their elegance
				and functionality. Shop with us today and discover the perfect addition to your luxurious lifestyle.
			</p>
			<div className={styles.container}>
				{products.map(({ id, title, price, images }) => (
					<div
						key={title}
						className={styles.button}
						onClick={() => {
							router.push(`/products/${id}`)
						}}>
						<Product title={title} price={price} images={images} />
					</div>
				))}
			</div>
		</section>
	)
}

export default Products
