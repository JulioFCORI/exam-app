import { QuestionOptionsList } from '../molecules/QuestionOptionsList.jsx'

export function QuestionCard({ numero, pregunta, opcionSeleccionada, onSeleccionarOpcion }) {
  return (
    <section className="rounded-lg border border-slate-200 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        Pregunta {numero} · {pregunta.categoria}
      </p>
      <h2 className="mt-1 text-lg font-semibold text-slate-900">{pregunta.enunciado}</h2>
      {pregunta.imagen && (
        <img src={pregunta.imagen} alt="" className="mt-3 max-h-64 rounded-md object-contain" />
      )}
      <QuestionOptionsList
        opciones={pregunta.opciones}
        seleccionada={opcionSeleccionada}
        onSeleccionar={onSeleccionarOpcion}
      />
    </section>
  )
}
