import { useContext } from 'react'
import ReactModal from 'react-modal'
import WishlistContext from '@Store/wishlist-context'

import CloseIcon from '@mui/icons-material/Close'

import Button from '@Components/common/Button/Button'
import WishlistModalCtx from './WishlistModalCtx/WishlistModalCtx'

import styles from './Wishlist.module.css'

ReactModal.setAppElement('#wishlistModal')

const WishlistModal = ({ isWishlistModalShown, hideWishlistModalHander }) => {
	const wishlistCtx = useContext(WishlistContext)

	return (
		<ReactModal
			style={{
				overlay: { backgroundColor: 'rgba(0,0,0,.6)', backdropFilter: 'blur(2px)' },
				content: {
					inset: '20px',
					maxWidth: '600px',
					height: 'min-content',
					margin: 'auto',
					display: 'flex',
					rowGap: '1rem',
					flexDirection: 'column',
					backgroundColor: '#fbfafa',
				},
			}}
			isOpen={isWishlistModalShown}
			onRequestClose={hideWishlistModalHander}>
			<Button type='icon' sx={{ alignSelf: 'flex-end' }} onClick={hideWishlistModalHander}>
				<CloseIcon />
			</Button>

			<h4 className={styles.title}>Your wishlist</h4>

			{wishlistCtx.wishlist.length === 0 && (
				<p className={styles.emptyWishlistText}>You do not have any products on your wishlist.</p>
			)}

			{wishlistCtx.wishlist.length > 0 && <WishlistModalCtx hideWishlistModalHander={hideWishlistModalHander} />}
		</ReactModal>
	)
}

export default WishlistModal
