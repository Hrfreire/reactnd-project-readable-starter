const logger = (store) => (next) => (action) => {
  console.group(action.type) //eslint-disable-line
    console.log('The action: ', action) //eslint-disable-line
    const returnValue = next(action)
    console.log('The new state: ', store.getState()) //eslint-disable-line
  console.groupEnd() //eslint-disable-line
  return returnValue
}

export default logger