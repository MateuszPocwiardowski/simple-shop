import React, { useContext } from 'react'
import CartContext from '@Store/cart-context'
import DeleteIcon from '@mui/icons-material/Delete'

import Button from '@Components/common/Button/Button'
import toCurrency from '@Utils/toCurrency'

import styles from './CartModalCtx.module.css'

const CartModalCtx = ({ proceedCheckoutHandler }) => {
	const cartCtx = useContext(CartContext)

	return (
		<React.Fragment>
			{cartCtx.cart.map(item => (
				<div className={styles.item} key={item.id}>
					<p className={styles.title}>{item.title}</p>
					<p className={styles.quantity}>{item.quantity}x</p>
					<p className={styles.price}>{toCurrency(item.price)}</p>

					<Button
						type='icon'
						onClick={() => {
							cartCtx.removeItemFromCart({ id: item.id })
						}}>
						<DeleteIcon />
					</Button>
				</div>
			))}
			<div className={styles.total}>
				<p>Total</p>
				<p>{toCurrency(cartCtx.price)}</p>
			</div>

			<Button type='contained' sx={{ alignSelf: 'center', marginTop: '2rem' }}>
				Proceed checkout
			</Button>
		</React.Fragment>
	)
}

export default CartModalCtx
