import { useState, useEffect, useContext } from 'react'
import WishlistContext from '@Store/wishlist-context'
import { useRouter } from 'next/router'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'

import Button from '@Components/common/Button/Button'
import toCurrency from '@Utils/toCurrency'

import styles from './Item.module.css'

const Item = ({ id, title, price, images }) => {
	const wishlistCtx = useContext(WishlistContext)
	const router = useRouter()

	const [itemOnWishlist, setItemOnWishList] = useState(true)

	const showDetailsHandler = () => {
		router.push('/items/' + id)
	}

	const clickHandler = event => {
		event.stopPropagation()

		wishlistCtx.wishlist.some(item => item.id === id)
			? wishlistCtx.removeItemFromWishlist({ id })
			: wishlistCtx.addItemToWishlist({ id, title, price, images })
	}

	useEffect(() => {
		setItemOnWishList(wishlistCtx.wishlist.some(item => item.id === id))
	}, [wishlistCtx.wishlist])

	const wishlistBtn = itemOnWishlist ? (
		<div className={styles.wishlistAdded}>
			<Button
				type='icon'
				sx={{
					color: '#f7f7f7',
				}}
				onClick={clickHandler}>
				<FavoriteIcon />
			</Button>
		</div>
	) : (
		<div className={styles.wishlist}>
			<Button
				type='icon'
				sx={{
					color: '#f7f7f7',
				}}
				onClick={clickHandler}>
				<FavoriteBorderIcon />
			</Button>
		</div>
	)

	return (
		<div className={styles.card} role='button' onClick={showDetailsHandler}>
			<img className={styles.image} src={images[0]} alt={title} />

			{wishlistBtn}

			<p className={styles.title}>{title}</p>
			<p className={styles.price}>{toCurrency(price)}</p>
		</div>
	)
}

export default Item
