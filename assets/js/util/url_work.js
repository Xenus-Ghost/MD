import { BACKEND_API_URL, BACKEND_URL } from '@/constants'

export function getUrl(path) {
  return `${BACKEND_API_URL}${path}`
}

export function getFileUrl(path) {
  console.log(path)
  if (!path.includes(BACKEND_URL) && !path.includes('://')) {
    return BACKEND_URL + 'storage/' + path
  } else {
    return path
  }
}

export function convertYoutubeLink(url, agressive = false) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)

  return match && match[2].length === 11 ? match[2] : !agressive ? url : null
}

export function jsonToParams(params) {
  const result = Object.entries(params)
    .map((e) => e.join('='))
    .join('&')
  return '?' + result
}
