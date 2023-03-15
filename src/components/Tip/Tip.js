import styles from './Tip.module.css'

const Tip = () => {
	return (
		<div className={styles.tip}>
			<h5 className={styles.title}>Creative harmonious living</h5>
			<p className={styles.text}>Products are all made to standard sizes so that you can mix and match them freely.</p>
			<button className={styles.button}>Shop now</button>
		</div>
	)
}

export default Tip
