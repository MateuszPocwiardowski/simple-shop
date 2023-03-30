import { useContext } from 'react'
import { useRouter } from 'next/router'
import WishlistContext from '@Store/wishlist-context'
import CartContext from '@Store/cart-context'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'

import Button from '@Components/common/Button/Button'
import toCurrency from '@Utils/toCurrency'

import styles from './WishlistItem.module.css'

const WishlistItem = ({ item, onRequestClose }) => {
	const wishlistCtx = useContext(WishlistContext)
	const cartCtx = useContext(CartContext)

	const router = useRouter()

	const showProductDetailsHandler = () => {
		onRequestClose()
		router.push('/items/' + item.id)
	}

	const addItemToCartHandler = () => {
		cartCtx.addItemToCart({ id: item.id, title: item.title, quantity: 1, price: item.price })
	}

	const removeItemFromWishlistHandler = () => {
		wishlistCtx.removeItemFromWishlist({ id: item.id })
	}

	const price = toCurrency(item.price)

	return (
		<div className={styles.item}>
			<img
				className={styles.image}
				type='button'
				src={item.images[0]}
				alt={item.title}
				onClick={showProductDetailsHandler}
			/>

			<Button
				type='text'
				sx={{ gridColumn: '2/5', gridRow: '1/2', textAlign: 'left', padding: 0 }}
				onClick={showProductDetailsHandler}>
				{item.title}
			</Button>

			<p className={styles.price}>{price}</p>

			<Button type='icon' onClick={addItemToCartHandler}>
				<ShoppingCartOutlinedIcon />
			</Button>

			<Button type='icon' onClick={removeItemFromWishlistHandler}>
				<DeleteOutlinedIcon />
			</Button>
		</div>
	)
}

export default WishlistItem
