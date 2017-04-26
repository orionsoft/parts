export default function (url) {
  const parts = url.split('/')
  const last = parts[parts.length - 1]
  const withOutId = last.replace(/^\w+?(_)/g, '')
  const clean = decodeURIComponent(withOutId)
  return clean
}
