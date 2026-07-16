const KEY_BANCO = 'examapp:banco'
const KEY_HISTORIAL = 'examapp:historial'

function leer(clave) {
  try {
    const valor = localStorage.getItem(clave)
    return valor ? JSON.parse(valor) : null
  } catch {
    return null
  }
}

function escribir(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor))
  } catch {
    // almacenamiento no disponible o lleno: se ignora silenciosamente
  }
}

export function getBanco() {
  return leer(KEY_BANCO)
}

export function setBanco(banco) {
  escribir(KEY_BANCO, banco)
}

export function getHistorial() {
  return leer(KEY_HISTORIAL)
}

export function setHistorial(historial) {
  escribir(KEY_HISTORIAL, historial)
}

export function clearHistorial() {
  try {
    localStorage.removeItem(KEY_HISTORIAL)
  } catch {
    // almacenamiento no disponible: se ignora silenciosamente
  }
}
