import { Fragment, useContext } from 'react'
import CartContext from '@Store/cart-context'

import CartItem from './CartItem/CartItem'
import Modal from '@Components/Modal/Modal'
import ModalCtx from '@Components/Modal/ModalCtx/ModalCtx'
import Button from '@Components/common/Button/Button'
import toCurrency from '@Utils/toCurrency'

import styles from './CartModal.module.css'

const CartModal = ({ isOpen, onRequestClose }) => {
	const cartCtx = useContext(CartContext)

	const proceedCheckoutHandler = event => {
		event.preventDefault()

		console.log('Ordered!')
		cartCtx.completeOrder()

		onRequestClose()
	}

	const totalPrice = toCurrency(cartCtx.price)

	return (
		<Modal isOpen={isOpen} onRequestClose={onRequestClose}>
			<ModalCtx title='Your cart' onRequestClose={onRequestClose}>
				{cartCtx.cart.length === 0 && (
					<p className={styles.emptyCartText}>You do not have any products in your cart.</p>
				)}

				{cartCtx.cart.length > 0 && (
					<Fragment>
						{cartCtx.cart.map(item => (
							<CartItem key={item.title} item={item} totalPrice={totalPrice} onRequestClose={onRequestClose} />
						))}

						<div className={styles.total}>
							<p className={styles.totalTitle}>Total</p>
							<p className={styles.totalPrice}>{totalPrice}</p>
						</div>

						<Button type='contained' onClick={proceedCheckoutHandler}>
							Proceed checkout
						</Button>
					</Fragment>
				)}
			</ModalCtx>
		</Modal>
	)
}

export default CartModal
