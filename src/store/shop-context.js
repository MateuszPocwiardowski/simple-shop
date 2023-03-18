import { useState, createContext } from 'react'

const ShopContext = createContext({
	products: [],
	totalQuantity: 0,
	totalQuote: 0,
	addProduct: () => {},
})

export const ShopContextProvider = ({ children }) => {
	const [products, setProducts] = useState([])
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

		setTotalQuantity(prevState => prevState + quantity)
		setTotalQuote(prevState => prevState + quote)
	}

	const contextValue = {
		products,
		totalQuantity,
		totalQuote,
		addProduct: addProductHandler,
	}

	return <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
}

export default ShopContext
