import ReactModal from 'react-modal'

ReactModal.setAppElement('#cartModal')
ReactModal.setAppElement('#wishlistModal')

const Modal = ({ isOpen, children, onRequestClose }) => {
	return (
		<ReactModal
			style={{
				overlay: { backgroundColor: 'rgba(0,0,0,.6)', backdropFilter: 'blur(2px)' },
				content: {
					inset: '20px',
					maxWidth: '600px',
					height: 'min-content',
					margin: 'auto',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					backgroundColor: '#fbfafa',
				},
			}}
			isOpen={isOpen}
			onRequestClose={onRequestClose}>
			{children}
		</ReactModal>
	)
}

export default Modal
