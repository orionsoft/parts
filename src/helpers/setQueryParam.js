/* global URLSearchParams */

export default function (name, value) {
  const searchParams = new URLSearchParams(window.location.search)
  searchParams.set(name, encodeURIComponent(value))
  const path = window.location.protocol + '//' + window.location.host + window.location.pathname + '?' + searchParams.toString()
  window.history.pushState({path}, '', path)
}
