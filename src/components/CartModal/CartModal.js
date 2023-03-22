import { useState, useEffect, useContext } from 'react'
import ReactModal from 'react-modal'
import CartContext from '@Store/cart-context'
import CloseIcon from '@mui/icons-material/Close'

import CartModalForm from './CartModalCtx/CartModalForm'
import Button from '@Components/common/Button/Button'
import CartModalCtx from './CartModalCtx/CartModalCtx'

import styles from './CartModal.module.css'

ReactModal.setAppElement('#cartModal')

const CartModal = ({ isCartModalShown, hideCartModalHandler }) => {
	const cartCtx = useContext(CartContext)

	const [isCheckout, setIsCheckout] = useState(false)

	const proceedCheckoutHandler = () => {
		setIsCheckout(prevState => !prevState)
	}

	useEffect(() => {
		if (isCartModalShown) setIsCheckout(false)
	}, [isCartModalShown])

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
					flexDirection: 'column',
					backgroundColor: '#fbfafa',
				},
			}}
			isOpen={isCartModalShown}
			onRequestClose={hideCartModalHandler}>
			<Button type='icon' sx={{ alignSelf: 'flex-end' }} onClick={hideCartModalHandler}>
				<CloseIcon />
			</Button>

			<h4 className={styles.title}>{isCheckout ? 'Compelete your order' : 'Your cart'}</h4>

			{!isCheckout && cartCtx.cart.length === 0 && (
				<p className={styles.emptyCartText}>You do not have any products in your basket.</p>
			)}

			{!isCheckout && cartCtx.cart.length > 0 && (
				<CartModalCtx proceedCheckoutHandler={proceedCheckoutHandler} hideCartModalHandler={hideCartModalHandler} />
			)}

			{isCheckout && (
				<CartModalForm proceedCheckoutHandler={proceedCheckoutHandler} hideCartModalHandler={hideCartModalHandler} />
			)}
		</ReactModal>
	)
}

export default CartModal
