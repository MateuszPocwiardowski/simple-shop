import { useContext } from 'react'
import CartContext from '@Store/cart-context'

import Input from '@Components/common/Input/Input'
import Button from '@Components/common/Button/Button'

import styles from './CartModalForm.module.css'

const CartModalForm = ({ proceedCheckoutHandler, hideCartModalHandler }) => {
	const cartCtx = useContext(CartContext)

	const submitFormHandler = event => {
		event.preventDefault()

		console.log('Ordered!')

		cartCtx.completeOrder()
        
		hideCartModalHandler()
		proceedCheckoutHandler()
	}

	return (
		<form className={styles.form} onSubmit={submitFormHandler}>
			<Input type='text' label='First name' required />
			<Input type='text' label='Last name' required />
			<Input type='text' label='Phone number' required />
			<Input type='text' label='E-mail' required />
			<Input type='text' label='Address line 1' required />
			<Input type='text' label='Address line 2' />

			<Button type='contained' sx={{ alignSelf: 'center', marginTop: '2rem' }}>
				Order
			</Button>
		</form>
	)
}

export default CartModalForm
