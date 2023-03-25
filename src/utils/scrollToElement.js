const scrollToElement = ({ id }) => {
	const element = document.getElementById(id)

	if (element) {
		window.scrollTo({
			top: element.offsetTop - 16,
			behavior: 'smooth',
		})
	}
}

export default scrollToElement
