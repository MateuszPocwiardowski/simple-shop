import { useContext } from 'react'
import WishlistContext from '@Store/wishlist-context'

import Modal from '@Components/Modal/Modal'
import ModalCtx from '@Components/Modal/ModalCtx/ModalCtx'
import WishlistItem from './WishlistItem/WishlistItem'

import styles from './WishlistModal.module.css'

const WishlistModal = ({ isOpen, onRequestClose }) => {
	const wishlistCtx = useContext(WishlistContext)

	return (
		<Modal isOpen={isOpen} onRequestClose={onRequestClose}>
			<ModalCtx title='Your wishlist' onRequestClose={onRequestClose}>
				{wishlistCtx.wishlist.length === 0 && (
					<p className={styles.emptyCartText}>You do not have any products on your wishlist.</p>
				)}

				{wishlistCtx.wishlist.length > 0 &&
					wishlistCtx.wishlist.map(item => (
						<WishlistItem key={item.title} item={item} onRequestClose={onRequestClose} />
					))}
			</ModalCtx>
		</Modal>
	)
}

export default WishlistModal
