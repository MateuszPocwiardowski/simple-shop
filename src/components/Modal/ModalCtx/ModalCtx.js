import { Fragment } from 'react'
import CloseIcon from '@mui/icons-material/Close'

import Button from '@Components/common/Button/Button'

import styles from './ModalCtx.module.css'

const ModalCtx = ({ title, children, onRequestClose }) => {
	return (
		<Fragment>
			<Button type='icon' sx={{ alignSelf: 'flex-end' }} onClick={onRequestClose}>
				<CloseIcon />
			</Button>

			<h4 className={styles.title}>{title}</h4>

			{children}
		</Fragment>
	)
}

export default ModalCtx
