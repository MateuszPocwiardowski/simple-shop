import { useState, useEffect, useContext } from 'react'
import WishlistContext from '@Store/wishlist-context'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'

import Button from '@Components/common/Button/Button'

import styles from './Wishlist.module.css'

const Wishlist = ({ item }) => {
	const wishlistCtx = useContext(WishlistContext)

	const [itemOnWishlist, setItemOnWishList] = useState(true)

	const clickHandler = event => {
		event.stopPropagation()

		wishlistCtx.wishlist.some(wishlistItem => wishlistItem.id === item.id)
			? wishlistCtx.removeItemFromWishlist({ id: item.id })
			: wishlistCtx.addItemToWishlist({ id: item.id, title: item.title, price: item.price, images: item.images })
	}

	useEffect(() => {
		setItemOnWishList(wishlistCtx.wishlist.some(wishlistItem => wishlistItem.id === item.id))
	}, [wishlistCtx.wishlist])

	if (itemOnWishlist) {
		return (
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
		)
	}

	return (
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
}

export default Wishlist
