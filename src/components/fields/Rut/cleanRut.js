const addGuion = function(text) {
  if (text.includes('-')) {
    return text
  } else {
    const dv = text[text.length - 1]
    const rut = text.replace(/.$/, '')
    return `${rut}-${dv}`
  }
}

export default function(rut) {
  if (!rut) return
  return addGuion(rut.replace(/[^\dkK]/g, ''))
    .replace(/\./g, '')
    .toUpperCase()
}
