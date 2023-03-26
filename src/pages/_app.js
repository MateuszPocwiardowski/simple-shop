import Layout from '@Components/Layout/Layout'
import { CartContextProvider } from '@Store/cart-context'
import { WishlistContextProvider } from '@Store/wishlist-context'

import '@Styles/Globals.css'

export default function App({ Component, pageProps }) {
	return (
		<CartContextProvider>
			<WishlistContextProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</WishlistContextProvider>
		</CartContextProvider>
	)
}
