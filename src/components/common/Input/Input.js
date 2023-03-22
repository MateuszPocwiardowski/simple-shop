import { TextField as MaterialUiInput } from '@mui/material'

import styles from './Input.module.css'

const Input = ({ id, label, type, value, onChange, sx, ...props }) => {
	return (
		<MaterialUiInput
			className={styles.input}
			InputProps={{
				classes: {
					notchedOutline: styles.inputBorder,
				},
			}}
			InputLabelProps={{
				classes: {
					root: styles.inputLabel,
					focused: styles.inputLabel,
				},
			}}
			id={id}
			label={label}
			type={type}
			value={value}
			name={id}
			onChange={onChange}
			{...props}
		/>
	)
}

export default Input
