import Button from '@Components/common/Button/Button'

import styles from './Banner.module.css'

const Banner = () => {
	return (
		<div className={styles.banner}>
			<h5 className={styles.title}>Creative harmonious living</h5>
			<p className={styles.text}>Products are all made to standard sizes so that you can mix and match them freely.</p>
			<Button type='contained'>Shop now</Button>
		</div>
	)
}

export default Banner
