export function convertToUnit(str, unit = 'px') {
  if (str == null || str === '') {
    return undefined
  } else if (isNaN(str)) {
    return String(str)
  } else {
    return `${Number(str)}${unit}`
  }
}

export function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

export function isString(str) {
  return str !== null && typeof str === 'string'
}

export const keyCodes = Object.freeze({
  enter: 13,
  tab: 9,
  delete: 46,
  esc: 27,
  space: 32,
  up: 38,
  down: 40,
  left: 37,
  right: 39,
  end: 35,
  home: 36,
  del: 46,
  backspace: 8,
  insert: 45,
  pageup: 33,
  pagedown: 34
})

export function generateString(number = 7) {
  let text = ''
  const possible = 'abcdefghijklmnopqrstuvwxyz'
  for (let i = 0; i < number; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}
