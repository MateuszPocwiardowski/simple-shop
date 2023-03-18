const setInStorage = (key, value) =>
	window.localStorage.setItem(key, typeof value === 'object' && !!value ? JSON.stringify(value) : value)

export default setInStorage
