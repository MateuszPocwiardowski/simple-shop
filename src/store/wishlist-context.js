import { useState, useEffect, createContext } from 'react'

import setInStorage from '@Utils/setInStorage'
import getFromStorage from '@Utils/getFromStorage'

const WishlistContext = createContext({
	wishlist: [],
	addItemToWishlist: () => {},
	removeItemFromWishlist: () => {},
})

export const WishlistContextProvider = ({ children }) => {
	let storedWishlist

	if (typeof window !== 'undefined') {
		storedWishlist = getFromStorage('wishlist')
	}

	const [wishlist, setWishlist] = useState(storedWishlist ?? [])

	const addItemToWishlistHandler = ({ id, title, price, images }) => {
		setWishlist(prevState => [...prevState, { id, title, price, images }])
	}

	const removeItemFromWishlistHandler = ({ id }) => {
		setWishlist(wishlist.filter(item => item.id !== id))
	}

	useEffect(() => {
		setInStorage('wishlist', wishlist)
	}, [wishlist])

	const contextValue = {
		wishlist,
		addItemToWishlist: addItemToWishlistHandler,
		removeItemFromWishlist: removeItemFromWishlistHandler,
	}

	return <WishlistContext.Provider value={contextValue}>{children}</WishlistContext.Provider>
}

export default WishlistContext
