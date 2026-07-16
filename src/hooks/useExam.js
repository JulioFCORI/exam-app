import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react'
import { validateExamBank } from '../schemas/examSchema.js'
import {
  construirResultadoExamen,
  resumirHistorial,
} from '../lib/scoring.js'
import {
  seleccionarPreguntasBalanceadas,
  seleccionarPreguntasRecuperacion,
} from '../lib/questionSelector.js'
import {
  getBanco,
  setBanco as guardarBanco,
  getHistorial,
  setHistorial as guardarHistorial,
  clearHistorial,
} from '../lib/storage.js'

const ADVERTENCIA_TIEMPO_SEGUNDOS = 3 * 60

function estadoInicial() {
  return {
    pantalla: 'plan',
    banco: getBanco(),
    historial: getHistorial(),
    errorBanco: null,
    examenActual: null,
    ultimoResultado: null,
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'CARGAR_BANCO_OK':
      return { ...state, banco: action.banco, historial: null, errorBanco: null }

    case 'CARGAR_BANCO_ERROR':
      return { ...state, errorBanco: action.error }

    case 'INICIAR_EXAMEN':
      return {
        ...state,
        pantalla: 'exam',
        ultimoResultado: null,
        examenActual: {
          preguntas: action.preguntas,
          respuestas: {},
          categoriasSeleccionadas: action.categoriasSeleccionadas,
          esRecuperacion: action.esRecuperacion,
          tiempoLimite: action.tiempoLimite,
          tiempoRestante: action.tiempoLimite,
          tiempoTranscurrido: 0,
          mostrarCronometro: true,
        },
      }

    case 'RESPONDER_PREGUNTA': {
      if (!state.examenActual) return state
      return {
        ...state,
        examenActual: {
          ...state.examenActual,
          respuestas: {
            ...state.examenActual.respuestas,
            [action.claveInstancia]: action.opcionIndice,
          },
        },
      }
    }

    case 'TICK': {
      if (!state.examenActual) return state
      const { tiempoLimite, tiempoRestante, tiempoTranscurrido } = state.examenActual
      if (tiempoLimite != null) {
        return {
          ...state,
          examenActual: { ...state.examenActual, tiempoRestante: Math.max(0, tiempoRestante - 1) },
        }
      }
      return {
        ...state,
        examenActual: { ...state.examenActual, tiempoTranscurrido: tiempoTranscurrido + 1 },
      }
    }

    case 'TOGGLE_CRONOMETRO': {
      if (!state.examenActual) return state
      return {
        ...state,
        examenActual: {
          ...state.examenActual,
          mostrarCronometro: !state.examenActual.mostrarCronometro,
        },
      }
    }

    case 'FINALIZAR_EXAMEN':
      return {
        ...state,
        pantalla: 'checkin',
        ultimoResultado: action.resultado,
        historial: action.historial,
      }

    case 'VOLVER_A_PLAN':
      return { ...state, pantalla: 'plan', examenActual: null, ultimoResultado: null }

    default:
      return state
  }
}

export function useExam() {
  const [state, dispatch] = useReducer(reducer, undefined, estadoInicial)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (state.pantalla !== 'exam') {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return undefined
    }

    intervalRef.current = setInterval(() => dispatch({ type: 'TICK' }), 1000)

    return () => {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [state.pantalla])

  const cargarBanco = useCallback((data) => {
    const resultado = validateExamBank(data)
    if (!resultado.success) {
      dispatch({ type: 'CARGAR_BANCO_ERROR', error: resultado.error })
      return resultado
    }
    guardarBanco(resultado.data)
    clearHistorial()
    dispatch({ type: 'CARGAR_BANCO_OK', banco: resultado.data })
    return resultado
  }, [])

  const contarPreguntasDisponibles = useCallback(
    (categoriasSeleccionadas) => {
      if (!state.banco) return 0
      return state.banco.categorias
        .filter((categoria) => categoriasSeleccionadas.includes(categoria.nombre))
        .reduce((total, categoria) => total + categoria.preguntas.length, 0)
    },
    [state.banco],
  )

  const iniciarExamen = useCallback(
    ({ categoriasSeleccionadas, numPreguntas, tiempoLimite = null }) => {
      if (!state.banco) return
      const preguntas = seleccionarPreguntasBalanceadas(
        state.banco.categorias,
        categoriasSeleccionadas,
        numPreguntas,
      )
      dispatch({
        type: 'INICIAR_EXAMEN',
        preguntas,
        tiempoLimite,
        categoriasSeleccionadas,
        esRecuperacion: false,
      })
    },
    [state.banco],
  )

  const iniciarRecuperacion = useCallback(
    (categoria) => {
      if (!state.banco || !state.historial) return
      const categoriaData = state.banco.categorias.find((c) => c.nombre === categoria)
      const entradaHistorial = state.historial.categorias[categoria]
      if (!categoriaData || !entradaHistorial) return

      const { tiempo, numPreguntas } = state.historial.ultimaConfig
      const preguntas = seleccionarPreguntasRecuperacion({
        categoria,
        preguntasFalladasIds: entradaHistorial.preguntasFalladas,
        todasLasPreguntasDeCategoria: categoriaData.preguntas,
        numPreguntas,
      })
      dispatch({
        type: 'INICIAR_EXAMEN',
        preguntas,
        tiempoLimite: tiempo,
        categoriasSeleccionadas: [categoria],
        esRecuperacion: true,
      })
    },
    [state.banco, state.historial],
  )

  const responderPregunta = useCallback((claveInstancia, opcionIndice) => {
    dispatch({ type: 'RESPONDER_PREGUNTA', claveInstancia, opcionIndice })
  }, [])

  const toggleCronometro = useCallback(() => {
    dispatch({ type: 'TOGGLE_CRONOMETRO' })
  }, [])

  const finalizarExamen = useCallback(() => {
    if (!state.examenActual) return
    const { preguntas, respuestas, categoriasSeleccionadas, tiempoLimite } = state.examenActual
    const { resultado, historialActualizado } = construirResultadoExamen({
      preguntas,
      respuestas,
      categoriasSeleccionadas,
      historialPrevio: state.historial,
      tiempoLimite,
    })
    guardarHistorial(historialActualizado)
    dispatch({ type: 'FINALIZAR_EXAMEN', resultado, historial: historialActualizado })
  }, [state.examenActual, state.historial])

  const volverAPlan = useCallback(() => {
    dispatch({ type: 'VOLVER_A_PLAN' })
  }, [])

  const { categoriasFallidas, categoriasAcreditadas, todasAcreditadas } = useMemo(
    () => resumirHistorial(state.historial),
    [state.historial],
  )

  const advertenciaTiempo = useMemo(() => {
    const examen = state.examenActual
    if (!examen || examen.tiempoLimite == null) return false
    return examen.tiempoRestante > 0 && examen.tiempoRestante <= ADVERTENCIA_TIEMPO_SEGUNDOS
  }, [state.examenActual])

  return {
    pantalla: state.pantalla,
    banco: state.banco,
    errorBanco: state.errorBanco,
    historial: state.historial,
    examenActual: state.examenActual,
    ultimoResultado: state.ultimoResultado,
    categoriasFallidas,
    categoriasAcreditadas,
    todasAcreditadas,
    advertenciaTiempo,
    cargarBanco,
    contarPreguntasDisponibles,
    iniciarExamen,
    iniciarRecuperacion,
    responderPregunta,
    toggleCronometro,
    finalizarExamen,
    volverAPlan,
  }
}
