import { useState, useContext, Fragment } from 'react'
import ShopContext from '@Store/shop-context'
import Link from 'next/link'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'

import toCurrency from '@Utils/toCurrency'
import Button from '@Components/common/Button/Button'
import ModalWindow from '@Components/Basket/Basket'

import styles from './Navigation.module.css'

const Navigation = () => {
	const shopCtx = useContext(ShopContext)

	const [modalIsOpen, setModalIsOpen] = useState(false)

	const showBasketHandler = () => {
		setModalIsOpen(true)
	}

	const closeBasketHandler = () => {
		setModalIsOpen(false)
	}

	return (
		<nav className={styles.nav}>
			<h1 className={styles.logo}>
				<Link href='/'>shop.me</Link>
			</h1>
			<ul className={styles.items}>
				<li className={styles.item}>
					<Link href='/'>Home</Link>
				</li>

				<Button type='icon' sx={{ position: 'relative' }} onClick={showBasketHandler}>
					<ShoppingCartOutlinedIcon />
					{!!shopCtx.totalQuantity && <p className={styles.quantity}>{shopCtx.totalQuantity}</p>}
				</Button>
			</ul>

			<ModalWindow modalIsOpen={modalIsOpen} closeModalHandler={closeBasketHandler}>
				<h4 className={styles.title}>Your basket</h4>

				{shopCtx.products.length === 0 && (
					<div className={styles.emptyBasket}>
						<p>You do not have any products in your basket.</p>
						<p>Let&apos;s buy something!</p>
					</div>
				)}

				{shopCtx.products.length > 0 && (
					<Fragment>
						<table className={styles.basketSummary}>
							<thead>
								<tr>
									<td>
										<span>Title</span>
									</td>
									<td>
										<span>Quantity</span>
									</td>
									<td>
										<span>Quote</span>
									</td>
								</tr>
							</thead>
							<tbody>
								{shopCtx.products.map(product => {
									return (
										<tr key={product.title}>
											<td>
												<span>{product.title}</span>
											</td>
											<td>
												<span>{product.quantity}</span>
											</td>
											<td>
												<span>{toCurrency(product.quote)}</span>
											</td>
										</tr>
									)
								})}
								<tr>
									<td colSpan={3}>&nbsp;</td>
								</tr>
								<tr className={styles.totalQuote}>
									<td></td>
									<td></td>
									<td>
										<span>Total</span>
									</td>
								</tr>
								<tr className={styles.totalQuoteAmount}>
									<td></td>
									<td></td>
									<td>
										<span>{toCurrency(shopCtx.totalQuote)}</span>
									</td>
								</tr>
							</tbody>
						</table>
					</Fragment>
				)}
			</ModalWindow>
		</nav>
	)
}

export default Navigation
