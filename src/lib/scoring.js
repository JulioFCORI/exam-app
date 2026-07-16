export const NOTA_ACREDITACION = 8

export function calcularCalificacion(correctas, total) {
  if (total === 0) return 0
  return Math.round((correctas / total) * 10 * 10) / 10
}

export function estaAcreditada(calificacion) {
  return calificacion >= NOTA_ACREDITACION
}

export function calcularResultadosPorCategoria(respuestas) {
  const conteos = {}

  for (const { categoria, esCorrecta } of respuestas) {
    if (!conteos[categoria]) {
      conteos[categoria] = { correctas: 0, total: 0 }
    }
    conteos[categoria].total += 1
    if (esCorrecta) conteos[categoria].correctas += 1
  }

  const resultados = {}
  for (const [categoria, { correctas, total }] of Object.entries(conteos)) {
    const calificacion = calcularCalificacion(correctas, total)
    resultados[categoria] = {
      correctas,
      total,
      calificacion,
      acreditada: estaAcreditada(calificacion),
    }
  }

  return resultados
}

export function obtenerCategoriasFallidas(resultadosPorCategoria) {
  return Object.entries(resultadosPorCategoria)
    .filter(([, resultado]) => resultado.calificacion < NOTA_ACREDITACION)
    .sort(([, a], [, b]) => a.calificacion - b.calificacion)
    .map(([categoria, resultado]) => ({ categoria, ...resultado }))
}

export function obtenerMejorPeorCategoria(resultadosPorCategoria) {
  const entradas = Object.entries(resultadosPorCategoria).map(([categoria, resultado]) => ({
    categoria,
    ...resultado,
    errores: resultado.total - resultado.correctas,
  }))

  if (entradas.length === 0) {
    return { mejor: null, peor: null }
  }

  const ordenadas = [...entradas].sort((a, b) => b.calificacion - a.calificacion)

  return {
    mejor: ordenadas[0],
    peor: ordenadas[ordenadas.length - 1],
  }
}

export function validarCantidadPreguntas(solicitadas, disponibles) {
  if (disponibles === 0) return null

  if (solicitadas >= disponibles * 1.3) {
    return {
      tipo: 'REPETICION_FRECUENTE',
      mensaje:
        'Es posible que se repitan preguntas con mucha más frecuencia ya que el examen es un 30% más grande que el archivo',
    }
  }

  if (solicitadas > disponibles) {
    return {
      tipo: 'REPETICION_POSIBLE',
      mensaje: 'El examen puede repetir preguntas ya que el archivo tiene menos contenido',
    }
  }

  return null
}

// Cierra un examen: calcula resultados y produce el historial actualizado.
// Un examen de >1 categorías reemplaza por completo la memoria de fallos
// (es un intento "completo" nuevo); un examen de 1 sola categoría (práctica
// o recuperación) sólo actualiza la entrada de esa categoría, preservando
// el resto — así es como se sostiene la "Persistencia de Errores" de CLAUDE.md.
export function construirResultadoExamen({
  preguntas,
  respuestas,
  categoriasSeleccionadas,
  historialPrevio,
  tiempoLimite,
}) {
  const respuestasEvaluadas = preguntas.map((pregunta) => ({
    categoria: pregunta.categoria,
    esCorrecta: respuestas[pregunta.claveInstancia] === pregunta.respuestaCorrecta,
  }))

  const resultadosPorCategoria = calcularResultadosPorCategoria(respuestasEvaluadas)
  const calificacionGlobal = calcularCalificacion(
    respuestasEvaluadas.filter((r) => r.esCorrecta).length,
    respuestasEvaluadas.length,
  )
  const { mejor, peor } = obtenerMejorPeorCategoria(resultadosPorCategoria)

  const preguntasFalladasPorCategoria = (categoria) => [
    ...new Set(
      preguntas
        .filter((p) => p.categoria === categoria && respuestas[p.claveInstancia] !== p.respuestaCorrecta)
        .map((p) => p.id),
    ),
  ]

  const entradasNuevas = Object.fromEntries(
    Object.entries(resultadosPorCategoria).map(([categoria, resultado]) => [
      categoria,
      {
        acreditado: resultado.acreditada,
        ultimaCalificacion: resultado.calificacion,
        preguntasFalladas: preguntasFalladasPorCategoria(categoria),
      },
    ]),
  )

  const configHeredada = {
    tiempo: tiempoLimite,
    numPreguntas: preguntas.length,
    categoriasSeleccionadas,
  }

  const esExamenCompleto = categoriasSeleccionadas.length > 1

  const historialActualizado = esExamenCompleto
    ? { categorias: entradasNuevas, ultimaConfig: configHeredada }
    : {
        categorias: { ...(historialPrevio?.categorias ?? {}), ...entradasNuevas },
        ultimaConfig: historialPrevio?.ultimaConfig ?? configHeredada,
      }

  return {
    resultado: { resultadosPorCategoria, calificacionGlobal, mejor, peor },
    historialActualizado,
  }
}

// Deriva de `historial` los datos que necesita la Pantalla 1: categorías
// fallidas ordenadas ascendente (peor primero), categorías acreditadas, y
// si ya se puede sugerir retomar el examen completo original.
export function resumirHistorial(historial) {
  if (!historial) {
    return { categoriasFallidas: [], categoriasAcreditadas: [], todasAcreditadas: false }
  }

  const entradas = Object.entries(historial.categorias)

  const categoriasFallidas = entradas
    .filter(([, c]) => !c.acreditado)
    .sort(([, a], [, b]) => a.ultimaCalificacion - b.ultimaCalificacion)
    .map(([categoria, c]) => ({ categoria, ...c }))

  const categoriasAcreditadas = entradas
    .filter(([, c]) => c.acreditado)
    .map(([categoria, c]) => ({ categoria, ...c }))

  const todasAcreditadas = entradas.length > 0 && categoriasFallidas.length === 0

  return { categoriasFallidas, categoriasAcreditadas, todasAcreditadas }
}
