const getFromStorage = key => JSON.parse(window.localStorage.getItem(key))

export default getFromStorage
