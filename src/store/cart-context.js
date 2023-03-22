import { useState, useEffect, createContext } from 'react'

import setInStorage from '@Utils/setInStorage'
import getFromStorage from '@Utils/getFromStorage'

const CartContext = createContext({
	cart: [],
	quantity: 0,
	price: 0,
	addItemToCart: () => {},
	removeItemFromCart: () => {},
	completeOrder: () => {},
})

export const CartContextProvider = ({ children }) => {
	let storedCart

	if (typeof window !== 'undefined') {
		storedCart = getFromStorage('Cart')
	}

	const [cart, setCart] = useState(storedCart ?? [])
	const [quantity, setQuantity] = useState(0)
	const [price, setPrice] = useState(0)

	const addItemToCartHandler = ({ id, title, quantity, price }) => {
		const cartItemIndex = cart.findIndex(item => item.id === id)

		if (cartItemIndex !== -1) {
			const updatedCartItem = {
				...cart[cartItemIndex],
				quantity: cart[cartItemIndex].quantity + quantity,
				price: cart[cartItemIndex].price + price,
			}

			const updatedCart = [...cart]
			updatedCart.splice(cartItemIndex, 1, updatedCartItem)

			setCart(updatedCart)
		} else {
			setCart(prevState => [...prevState, { id, title, quantity, price }])
		}
	}

	const removeItemFromCartHandler = ({ id }) => {
		setCart(cart.filter(item => item.id !== id))
	}

	const completeOrderHandler = () => {
		setCart([])
	}

	useEffect(() => {
		setInStorage('Cart', cart)

		setQuantity(
			cart.reduce((total, item) => {
				return total + item.quantity
			}, 0)
		)

		setPrice(
			cart.reduce((total, item) => {
				return total + item.price
			}, 0)
		)
	}, [cart])

	const contextValue = {
		cart,
		quantity,
		price,
		addItemToCart: addItemToCartHandler,
		removeItemFromCart: removeItemFromCartHandler,
		completeOrder: completeOrderHandler,
	}

	return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
}

export default CartContext
