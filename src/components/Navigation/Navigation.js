import React from 'react'
import Link from 'next/link'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'

import Button from '@Components/common/Button/Button'

import styles from './Navigation.module.css'

const Navigation = () => {
	return (
		<nav className={styles.nav}>
			<h1 className={styles.logo}>
				<Link href='/'>shop.me</Link>
			</h1>

			<ul className={styles.items}>
				<li className={styles.item}>
					<Link href='/'>Home</Link>
				</li>
				<Button type='icon'>
					<ShoppingCartOutlinedIcon />
				</Button>
			</ul>
		</nav>
	)
}

export default Navigation
