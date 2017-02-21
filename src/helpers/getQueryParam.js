/* global URL */

export default function (name) {
  const params = new URL(window.location.href).searchParams
  return params.get(name)
}
