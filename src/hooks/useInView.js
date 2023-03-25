import { useState, useEffect, useRef } from 'react'

const useInView = ({ threshold }) => {
	const [inView, setinView] = useState(false)
	const ref = useRef(null)

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => setinView(entry.isIntersecting), {
			root: null,
			rootMargin: '0px',
			threshold,
		})

		if (ref.current) {
			observer.observe(ref.current)
		}

		return () => {
			if (ref.current) {
				// eslint-disable-next-line
				observer.unobserve(ref.current)
			}
		}
	}, [threshold])

	return { ref, inView }
}

export default useInView
