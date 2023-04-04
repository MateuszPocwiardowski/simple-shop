import { useContext, Fragment } from 'react'
import { useRouter } from 'next/router'
import CartContext from '@Store/cart-context'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'

import Button from '@Components/common/Button/Button'
import toCurrency from '@Utils/toCurrency'

import styles from './CartItem.module.css'

const CartItem = ({ item, onRequestClose }) => {
	const cartCtx = useContext(CartContext)

	const router = useRouter()

	const showProductDetailsHandler = () => {
		onRequestClose()
		router.push('/items/' + item.id)
	}

	const increaseProductQuantityInCartHandler = () => {
		cartCtx.addItemToCart({
			id: item.id,
			title: item.title,
			quantity: 1,
			price: item.price / item.quantity,
		})
	}

	const decreaseProductQuantityInCartHandler = () => {
		cartCtx.reduceQuantity({ id: item.id })
	}

	const removeProductFromCartHandler = () => {
		cartCtx.removeItemFromCart({ id: item.id })
	}

	const formattedPrice = toCurrency(item.price)

	return (
		<div className={styles.item}>
			<Button type='text' sx={{ textAlign: 'left', padding: 0 }} onClick={showProductDetailsHandler}>
				{item.title}
			</Button>

			<div className={styles.quantity}>
				<button className={styles.button} onClick={increaseProductQuantityInCartHandler}>
					+
				</button>

				<p className={styles.amount}>{item.quantity}</p>

				<button className={styles.button} onClick={decreaseProductQuantityInCartHandler}>
					-
				</button>
			</div>
			<p className={styles.price}>{formattedPrice}</p>

			<Button type='icon' onClick={removeProductFromCartHandler}>
				<DeleteOutlinedIcon />
			</Button>
		</div>
	)
}

export default CartItem
