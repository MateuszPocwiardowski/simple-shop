import Footer from '../Footer/Footer'
import Navigation from '../Navigation/Navigation'

import styles from './Layout.module.css'

const Layout = ({ children }) => {
	return (
		<div className={styles.layout}>
			<Navigation />
			<main className={styles.main}>{children}</main>
			<Footer />
		</div>
	)
}

export default Layout
