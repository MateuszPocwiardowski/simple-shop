import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import CartContext from '@Store/cart-context'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'

import Button from '@Components/common/Button/Button'
import toCurrency from '@Utils/toCurrency'

import styles from './CartModalCtx.module.css'

const CartModalCtx = ({ hideCartModalHandler }) => {
	const cartCtx = useContext(CartContext)

	const router = useRouter()

	const proceedCheckoutHandler = event => {
		event.preventDefault()

		console.log('Ordered!')
		cartCtx.completeOrder()

		hideCartModalHandler()
	}

	return (
		<React.Fragment>
			{cartCtx.cart.map(item => (
				<div className={styles.item} key={item.id}>
					<Link
						className={styles.title}
						href={`/items/${item.id}`}
						onClick={() => {
							hideCartModalHandler()
							router.push('/items/' + item.id)
						}}>
						{item.title}
					</Link>

					<div className={styles.quantity}>
						<button
							className={styles.button}
							onClick={() => {
								cartCtx.addItemToCart({
									id: item.id,
									title: item.title,
									quantity: 1,
									price: item.price / item.quantity,
								})
							}}>
							+
						</button>
						<p className={styles.amount}>{item.quantity}</p>
						<button
							className={styles.button}
							onClick={() => {
								cartCtx.reduceQuantity({ id: item.id })
							}}>
							-
						</button>
					</div>
					<p className={styles.price}>{toCurrency(item.price)}</p>

					<Button
						type='icon'
						onClick={() => {
							cartCtx.removeItemFromCart({ id: item.id })
						}}>
						<DeleteOutlinedIcon />
					</Button>
				</div>
			))}
			<div className={styles.total}>
				<p>Total</p>
				<p>{toCurrency(cartCtx.price)}</p>
			</div>

			<Button type='contained' sx={{ alignSelf: 'center', marginTop: '2rem' }} onClick={proceedCheckoutHandler}>
				Proceed checkout
			</Button>
		</React.Fragment>
	)
}

export default CartModalCtx
