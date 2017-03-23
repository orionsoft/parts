/* global URL */

export default function (name) {
  const params = new URL(window.location.href).searchParams
  const value = params.get(name)
  if (!value) return
  const decoded = decodeURIComponent(value)
  return decoded
}
