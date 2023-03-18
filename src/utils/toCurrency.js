const toCurrency = value => {
	const number = Number(value)

	const formatter = new Intl.NumberFormat('pl-PL', {
		style: 'currency',
		currency: 'PLN',
	})

	return formatter.format(number)
}

export default toCurrency