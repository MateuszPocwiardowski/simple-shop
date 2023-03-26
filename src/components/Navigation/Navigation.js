import { useState, useEffect, useContext } from 'react'
import CartContext from '@Store/cart-context'
import Link from 'next/link'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'

import WishlistModal from '@Components/WishlistModal/WishlistModal'
import CartModal from '@Components/CartModal/CartModal'
import Button from '@Components/common/Button/Button'

import styles from './Navigation.module.css'

const Navigation = () => {
	const cartCtx = useContext(CartContext)

	const [isWishlistModalShown, setIsWishlistModalShown] = useState(false)
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

	const showWishlistModalHander = () => {
		setIsWishlistModalShown(true)
	}

	const hideWishlistModalHander = () => {
		setIsWishlistModalShown(false)
	}

	return (
		<nav className={styles.nav}>
			<h1 className={styles.logo}>
				<Link href='/'>so.simple.shop</Link>
			</h1>

			<div className={styles.items}>
				<Button type='icon' sx={{ position: 'relative' }} onClick={showWishlistModalHander}>
					<FavoriteBorderIcon />
				</Button>

				<Button type='icon' sx={{ position: 'relative' }} onClick={showCartModalHandler}>
					<ShoppingBagOutlinedIcon />
					{cartCtx.quantity > 0 && <p className={styles.quantity}>{cartCtx.quantity}</p>}
				</Button>
			</div>

			<WishlistModal isWishlistModalShown={isWishlistModalShown} hideWishlistModalHander={hideWishlistModalHander} />

			<CartModal isCartModalShown={isCartModalShown} hideCartModalHandler={hideCartModalHandler} />
		</nav>
	)
}

export default Navigation
