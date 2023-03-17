import Layout from '@Components/Layout/Layout'
import { ShopContextProvider } from '@Store/shop-context'

import '@Styles/Globals.css'

export default function App({ Component, pageProps }) {
	return (
		<ShopContextProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ShopContextProvider>
	)
}
