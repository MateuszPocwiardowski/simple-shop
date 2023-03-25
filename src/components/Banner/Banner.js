import Button from '@Components/common/Button/Button'
import scrollToElement from '@Utils/scrollToElement'

import styles from './Banner.module.css'

const Banner = () => {
	const shopNowHandler = () => {
		scrollToElement({ id: 'products' })
	}

	return (
		<div className={styles.banner}>
			<h5 className={styles.title}>Creative harmonious living</h5>
			<p className={styles.text}>Products are all made to standard sizes so that you can mix and match them freely.</p>
			<Button type='contained' onClick={shopNowHandler}>
				Shop now
			</Button>
		</div>
	)
}

export default Banner
