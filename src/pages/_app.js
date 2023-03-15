import Layout from '@Components/Layout/Layout'

import '@Styles/Globals.css'

export default function App({ Component, pageProps }) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	)
}
