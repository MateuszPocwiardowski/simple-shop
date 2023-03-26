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
				<button className={styles.text} style={sx} onClick={onClick} {...props}>
					{children}
				</button>
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
