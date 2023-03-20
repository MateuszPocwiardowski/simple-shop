import styles from './Stock.module.css'

const Stock = ({ stock }) => {
	const maxStock = 20
	const stockPercentage = stock >= maxStock ? 100 : Math.floor((stock / maxStock) * 100)

	if (stockPercentage === 0) return <p className={styles.outOfStock}>out of stock</p>

	return (
		<div className={styles.stock}>
			<div
				style={{
					height: '100%',
					width: stockPercentage + '%',
					backgroundColor: `${stockPercentage > 50 ? '#539165' : stockPercentage > 25 ? '#DC8449' : '#921515'}`,
				}}></div>
		</div>
	)
}

export default Stock
