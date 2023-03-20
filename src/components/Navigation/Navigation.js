import { useState, useEffect, useContext } from 'react'
import CartContext from '@Store/cart-context'
import Link from 'next/link'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'

import CartModal from '@Components/CartModal/CartModal'
import Button from '@Components/common/Button/Button'

import styles from './Navigation.module.css'

const Navigation = () => {
	const cartCtx = useContext(CartContext)

	const [isCartModalShown, setIsCartModalShown] = useState(false)

	useEffect(() => {
		if (cartCtx.cart.length > 0) setIsCartModalShown(true)
	}, [cartCtx.cart])

	const showCartModalHandler = () => {
		setIsCartModalShown(true)
	}

	const hideCartModalHandler = () => {
		setIsCartModalShown(false)
	}

	return (
		<nav className={styles.nav}>
			<h1 className={styles.logo}>
				<Link href='/'>so.simple.shop</Link>
			</h1>

			<ul className={styles.links}>
				<li className={styles.link}>
					<Link href='/'>Home</Link>
				</li>

				<Button type='icon' sx={{ position: 'relative' }} onClick={showCartModalHandler}>
					<ShoppingCartOutlinedIcon />
					{cartCtx.quantity > 0 && <p className={styles.quantity}>{cartCtx.quantity}</p>}
				</Button>
			</ul>

			<CartModal isCartModalShown={isCartModalShown} hideCartModalHandler={hideCartModalHandler} />
		</nav>
	)
}

export default Navigation
