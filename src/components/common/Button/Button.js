import styles from './Button.module.css'

const Button = ({ type, children, id, isOpened, onClick, sx, ...props }) => {
	switch (type) {
		case 'contained':
			return (
				<button className={styles.contained} id={id} style={sx} onClick={onClick} {...props}>
					{children}
				</button>
			)

		case 'contained-inverted': {
			return (
				<button className={styles.containedInverted} id={id} style={sx} onClick={onClick} {...props}>
					{children}
				</button>
			)
		}

		case 'text':
			return (
				<button className={styles.text} id={id} style={sx} onClick={onClick} {...props}>
					{children}
				</button>
			)

		case 'icon': {
			return (
				<button className={styles.icon} id={id} onClick={onClick} style={sx} {...props}>
					{children}
				</button>
			)
		}
	}
}

export default Button
