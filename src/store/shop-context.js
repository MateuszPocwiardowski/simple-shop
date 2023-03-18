import { useState, useEffect, createContext } from 'react'

import setInStorage from '@Utils/setInStorage'
import getFromStorage from '@Utils/getFromStorage'

const ShopContext = createContext({
	products: [],
	totalQuantity: 0,
	totalQuote: 0,
	addProduct: () => {},
})

export const ShopContextProvider = ({ children }) => {
	let initialBasket

	if (typeof window !== 'undefined') {
		initialBasket = getFromStorage('basket')
	}

	const [products, setProducts] = useState(initialBasket ?? [])
	const [totalQuantity, setTotalQuantity] = useState(0)
	const [totalQuote, setTotalQuote] = useState(0)

	const addProductHandler = (title, quantity, quote) => {
		const existingProductIndex = products.findIndex(product => product.title === title)

		if (existingProductIndex !== -1) {
			const updatedProducts = [...products]
			updatedProducts[existingProductIndex].quantity += quantity
			updatedProducts[existingProductIndex].quote += quote

			setProducts(updatedProducts)
		} else {
			setProducts(prevState => [...prevState, { title, quantity, quote }])
		}
	}

	useEffect(() => {
		setInStorage('basket', products)

		setTotalQuantity(
			products.reduce((total, product) => {
				return total + product.quantity
			}, 0)
		)

		setTotalQuote(
			products.reduce((total, product) => {
				return total + product.quote
			}, 0)
		)
	}, [products])

	const contextValue = {
		products,
		totalQuantity,
		totalQuote,
		addProduct: addProductHandler,
	}

	return <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
}

export default ShopContext
