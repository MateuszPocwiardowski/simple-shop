import { useContext } from 'react'
import ReactModal from 'react-modal'
import CartContext from '@Store/cart-context'
import CloseIcon from '@mui/icons-material/Close'

import Button from '@Components/common/Button/Button'
import CartModalCtx from './CartModalCtx/CartModalCtx'

import styles from './CartModal.module.css'

ReactModal.setAppElement('#cartModal')

const CartModal = ({ isCartModalShown, hideCartModalHandler }) => {
	const cartCtx = useContext(CartContext)

	return (
		<ReactModal
			style={{
				overlay: { backgroundColor: 'rgba(0,0,0,.6)', backdropFilter: 'blur(2px)' },
				content: {
					inset: '20px',
					maxWidth: '600px',
					margin: '0 auto',
					display: 'flex',
					flexDirection: 'column',
					backgroundColor: '#fbfafa',
				},
			}}
			isOpen={isCartModalShown}
			onRequestClose={hideCartModalHandler}>
			<Button type='icon' sx={{ alignSelf: 'flex-end' }} onClick={hideCartModalHandler}>
				<CloseIcon />
			</Button>

			<h4 className={styles.title}>Your cart</h4>

			{cartCtx.cart.length === 0 && (
				<p className={styles.emptyCartText}>You do not have any products in your basket.</p>
			)}

			{cartCtx.cart.length > 0 && <CartModalCtx />}
		</ReactModal>
	)
}

export default CartModal
