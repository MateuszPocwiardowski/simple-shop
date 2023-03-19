import Layout from '@Components/Layout/Layout'
import { CartContextProvider } from '@Store/cart-context'

import '@Styles/Globals.css'

export default function App({ Component, pageProps }) {
	return (
		<CartContextProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</CartContextProvider>
	)
}
