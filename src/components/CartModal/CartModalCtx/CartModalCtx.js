import React, { useContext } from 'react'
import CartContext from '@Store/cart-context'
import RemoveIcon from '@mui/icons-material/Remove'

import Button from '@Components/common/Button/Button'
import toCurrency from '@Utils/toCurrency'

import styles from './CartModalCtx.module.css'

const CartModalCtx = () => {
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
						<RemoveIcon />
					</Button>
				</div>
			))}
			<div className={styles.total}>
				<p>Total</p>
				<p>{toCurrency(cartCtx.price)}</p>
			</div>
		</React.Fragment>
	)
}

export default CartModalCtx
