import React, { useContext } from 'react'
import WishlistContext from '@Store/wishlist-context'
import DeleteIcon from '@mui/icons-material/Delete'

import Button from '@Components/common/Button/Button'
import toCurrency from '@Utils/toCurrency'

import styles from './WishlistModalCtx.module.css'

const WishlistModalCtx = () => {
	const wishlistCtx = useContext(WishlistContext)

	return (
		<React.Fragment>
			{wishlistCtx.wishlist.map(item => (
				<div className={styles.item} key={item.id}>
					<p className={styles.title}>{item.title}</p>
					<p className={styles.price}>{toCurrency(item.price)}</p>

					<Button
						type='icon'
						onClick={() => {
							wishlistCtx.removeItemFromWishlist({ id: item.id })
						}}>
						<DeleteIcon />
					</Button>
				</div>
			))}
		</React.Fragment>
	)
}

export default WishlistModalCtx
