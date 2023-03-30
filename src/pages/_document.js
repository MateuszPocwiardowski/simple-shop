import { Html, Head, Main, NextScript } from 'next/document'
import ReactModal from 'react-modal'

ReactModal.setAppElement('#cartModal')
ReactModal.setAppElement('#wishlistModal')

export default function Document() {
	return (
		<Html lang='en'>
			<Head />
			<body>
				<Main />
				<NextScript />
				<div id='wishlistModal'></div>
				<div id='cartModal'></div>
			</body>
		</Html>
	)
}
