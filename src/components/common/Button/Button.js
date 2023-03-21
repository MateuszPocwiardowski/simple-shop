import { Button as MaterialUiButton } from '@mui/material'

import styles from './Button.module.css'

const Button = ({ type, children, isOpened, onClick, sx, ...props }) => {
	switch (type) {
		case 'contained':
			return (
				<button className={styles.contained} style={sx} onClick={onClick} {...props}>
					{children}
				</button>
			)

		case 'contained-inverted': {
			return (
				<button className={styles.containedInverted} style={sx} onClick={onClick} {...props}>
					{children}
				</button>
			)
		}

		case 'text':
			return (
				<MaterialUiButton className={styles.text} variant={type} sx={{ ...sx }} onClick={onClick} {...props}>
					{children}
				</MaterialUiButton>
			)

		case 'icon': {
			return (
				<button className={styles.icon} onClick={onClick} style={sx} {...props}>
					{children}
				</button>
			)
		}
	}
}

export default Button
