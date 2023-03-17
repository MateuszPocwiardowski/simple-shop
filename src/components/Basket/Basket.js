import Modal from 'react-modal'
import styles from './Basket.module.css'

Modal.setAppElement('#basketModal')

const ModalWindow = ({ children, modalIsOpen, closeModalHandler }) => {
	return (
		<Modal className={styles.modal} isOpen={modalIsOpen} onRequestClose={closeModalHandler}>
			<div className={styles.content} onClick={closeModalHandler}>
				{children}
			</div>
		</Modal>
	)
}

export default ModalWindow
