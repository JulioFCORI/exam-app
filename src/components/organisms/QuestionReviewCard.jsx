import { Badge } from '../atoms/Badge.jsx'
import { QuestionReviewOptions } from '../molecules/QuestionReviewOptions.jsx'

export function QuestionReviewCard({ numero, pregunta, opcionSeleccionada }) {
  const esCorrecta = opcionSeleccionada === pregunta.respuestaCorrecta

  return (
    <section className="rounded-lg border border-slate-200 p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Pregunta {numero} · {pregunta.categoria}
        </p>
        <Badge tono={esCorrecta ? 'exito' : 'error'}>{esCorrecta ? 'Correcta' : 'Incorrecta'}</Badge>
      </div>
      <h3 className="mt-1 text-base font-semibold text-slate-900">{pregunta.enunciado}</h3>
      {pregunta.imagen && (
        <img src={pregunta.imagen} alt="" className="mt-3 max-h-64 rounded-md object-contain" />
      )}
      <QuestionReviewOptions
        opciones={pregunta.opciones}
        respuestaCorrecta={pregunta.respuestaCorrecta}
        opcionSeleccionada={opcionSeleccionada}
      />
      {pregunta.explicacion && (
        <p className="mt-3 rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-600">
          <span className="font-medium">Explicación: </span>
          {pregunta.explicacion}
        </p>
      )}
    </section>
  )
}
