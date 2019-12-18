export const get = key => {
  let res

  try {
    res = JSON.parse(localStorage.getItem(key))
  } catch (e) {
    res = undefined
  }

  return res
}

export const set = (key, value) => {
  let val = value !== undefined ? JSON.stringify(value) : null

  localStorage.setItem(key, val)
}

export const remove = key => { localStorage.removeItem(key) }

export const clear = () => { localStorage.clear() }
