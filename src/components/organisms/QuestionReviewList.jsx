import { QuestionReviewCard } from './QuestionReviewCard.jsx'

export function QuestionReviewList({ preguntas, respuestas }) {
  if (preguntas.length === 0) {
    return <p className="text-sm text-slate-500">No hay preguntas que coincidan con los filtros seleccionados.</p>
  }

  return (
    <div className="space-y-4">
      {preguntas.map((pregunta) => (
        <QuestionReviewCard
          key={pregunta.claveInstancia}
          numero={pregunta.numero}
          pregunta={pregunta}
          opcionSeleccionada={respuestas[pregunta.claveInstancia]}
        />
      ))}
    </div>
  )
}
