import { BACKEND_URL, BACKEND_API_URL } from '@/constants'

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

export function getUrl(path) {
  return BACKEND_API_URL + path
}

export function getFileUrl(path) {
  return BACKEND_URL + 'storage/' + path
}

export function convertYoutubeLink(url, agressive = false) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)

  return match && match[2].length === 11 ? match[2] : !agressive ? url : null
}
