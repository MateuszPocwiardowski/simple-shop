import { useContext, Fragment } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import WishlistContext from '@Store/wishlist-context'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'

import Button from '@Components/common/Button/Button'
import toCurrency from '@Utils/toCurrency'

import styles from './WishlistModalCtx.module.css'

const WishlistModalCtx = ({ hideWishlistModalHander }) => {
	const wishlistCtx = useContext(WishlistContext)
	const router = useRouter()

	return (
		<Fragment>
			{wishlistCtx.wishlist.map(item => (
				<div className={styles.item} key={item.id}>
					<img
						className={styles.image}
						src={item.images[0]}
						alt={item.title}
						onClick={() => {
							hideWishlistModalHander()
							router.push('/items/' + item.id)
						}}
					/>

					<Link
						className={styles.title}
						href={`/items/${item.id}`}
						onClick={() => {
							hideWishlistModalHander()
							router.push('/items/' + item.id)
						}}>
						{item.title}
					</Link>

					<p className={styles.price}>{toCurrency(item.price)}</p>

					<Button type='icon'>
						<ShoppingBagOutlinedIcon />
					</Button>

					<Button
						type='icon'
						onClick={() => {
							wishlistCtx.removeItemFromWishlist({ id: item.id })
						}}>
						<DeleteOutlinedIcon />
					</Button>
				</div>
			))}
		</Fragment>
	)
}

export default WishlistModalCtx
