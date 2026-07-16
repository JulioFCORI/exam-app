import { useMemo, useState } from 'react'
import { CheckinTemplate } from '../templates/CheckinTemplate.jsx'
import { ResumenResultados } from '../organisms/ResumenResultados.jsx'
import { QuestionReviewList } from '../organisms/QuestionReviewList.jsx'
import { FiltroEstado } from '../molecules/FiltroEstado.jsx'
import { FiltroCategorias } from '../molecules/FiltroCategorias.jsx'
import { Button } from '../atoms/Button.jsx'

export function CheckinScreen({ exam }) {
  const { examenActual, ultimoResultado } = exam

  const categorias = useMemo(
    () => [...new Set(examenActual.preguntas.map((pregunta) => pregunta.categoria))],
    [examenActual.preguntas],
  )

  const [mostrarRevision, setMostrarRevision] = useState(false)
  const [filtroEstado, setFiltroEstado] = useState('todas')
  const [filtroCategorias, setFiltroCategorias] = useState(categorias)

  function alternarCategoriaFiltro(categoria) {
    setFiltroCategorias((actuales) =>
      actuales.includes(categoria) ? actuales.filter((c) => c !== categoria) : [...actuales, categoria],
    )
  }

  // "orden ascendente": se numeran sobre el listado completo antes de filtrar, para que
  // el número de pregunta se conserve aunque algunas queden ocultas por los filtros.
  const preguntasNumeradas = useMemo(
    () => examenActual.preguntas.map((pregunta, indice) => ({ ...pregunta, numero: indice + 1 })),
    [examenActual.preguntas],
  )

  const preguntasFiltradas = useMemo(
    () =>
      preguntasNumeradas.filter((pregunta) => {
        const esCorrecta = examenActual.respuestas[pregunta.claveInstancia] === pregunta.respuestaCorrecta
        if (filtroEstado === 'correctas' && !esCorrecta) return false
        if (filtroEstado === 'incorrectas' && esCorrecta) return false
        return filtroCategorias.includes(pregunta.categoria)
      }),
    [preguntasNumeradas, examenActual.respuestas, filtroEstado, filtroCategorias],
  )

  return (
    <CheckinTemplate
      resumen={
        <ResumenResultados
          calificacionGlobal={ultimoResultado.calificacionGlobal}
          mejor={ultimoResultado.mejor}
          peor={ultimoResultado.peor}
        />
      }
      acciones={
        <div className="flex gap-2">
          <Button variante="secundario" onClick={exam.volverAPlan}>
            Salir
          </Button>
          <Button onClick={() => setMostrarRevision((valor) => !valor)}>
            {mostrarRevision ? 'Ocultar preguntas' : 'Ver preguntas'}
          </Button>
        </div>
      }
      filtros={
        mostrarRevision && (
          <div className="space-y-3 rounded-lg border border-slate-200 p-4">
            <FiltroEstado valor={filtroEstado} onCambiar={setFiltroEstado} />
            <FiltroCategorias
              categorias={categorias}
              seleccionadas={filtroCategorias}
              onToggle={alternarCategoriaFiltro}
            />
          </div>
        )
      }
      revision={
        mostrarRevision && (
          <QuestionReviewList preguntas={preguntasFiltradas} respuestas={examenActual.respuestas} />
        )
      }
    />
  )
}
