import { shuffle } from './shuffle.js'

export function seleccionarPreguntasBalanceadas(categorias, nombresSeleccionados, numPreguntas) {
  const categoriasElegidas = categorias.filter((categoria) =>
    nombresSeleccionados.includes(categoria.nombre),
  )

  if (categoriasElegidas.length === 0 || numPreguntas <= 0) return []

  const porCategoria = Math.floor(numPreguntas / categoriasElegidas.length)
  const restante = numPreguntas % categoriasElegidas.length

  const seleccionadas = []

  categoriasElegidas.forEach((categoria, indice) => {
    const cantidad = porCategoria + (indice < restante ? 1 : 0)
    const tomadas = tomarConRepeticion(categoria.preguntas, cantidad)
    seleccionadas.push(...tomadas.map((pregunta) => ({ ...pregunta, categoria: categoria.nombre })))
  })

  return conClaveInstancia(shuffle(seleccionadas))
}

export function seleccionarPreguntasRecuperacion({
  categoria,
  preguntasFalladasIds,
  todasLasPreguntasDeCategoria,
  numPreguntas,
}) {
  if (numPreguntas <= 0) return []

  const falladas = todasLasPreguntasDeCategoria.filter((pregunta) =>
    preguntasFalladasIds.includes(pregunta.id),
  )
  const noVistas = todasLasPreguntasDeCategoria.filter(
    (pregunta) => !preguntasFalladasIds.includes(pregunta.id),
  )

  const priorizadas = [...falladas, ...noVistas]
  const seleccionadas = tomarConRepeticion(priorizadas, numPreguntas).map((pregunta) => ({
    ...pregunta,
    categoria,
  }))

  return conClaveInstancia(shuffle(seleccionadas))
}

// Asigna un identificador único por posición: si numPreguntas excede las
// disponibles, una misma pregunta (mismo `id`) puede repetirse en el
// examen, y cada aparición necesita una clave distinta para registrar
// su respuesta de forma independiente.
function conClaveInstancia(preguntas) {
  return preguntas.map((pregunta, indice) => ({
    ...pregunta,
    claveInstancia: `${pregunta.id}::${indice}`,
  }))
}

function tomarConRepeticion(preguntas, cantidad) {
  if (preguntas.length === 0 || cantidad <= 0) return []

  const resultado = []
  let fuente = shuffle(preguntas)

  while (resultado.length < cantidad) {
    if (fuente.length === 0) fuente = shuffle(preguntas)
    resultado.push(fuente.pop())
  }

  return resultado
}
