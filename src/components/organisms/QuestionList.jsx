import { QuestionCard } from './QuestionCard.jsx'

export function QuestionList({ preguntas, respuestas, onResponder }) {
  return (
    <div className="space-y-4">
      {preguntas.map((pregunta, indice) => (
        <QuestionCard
          key={pregunta.claveInstancia}
          numero={indice + 1}
          pregunta={pregunta}
          opcionSeleccionada={respuestas[pregunta.claveInstancia]}
          onSeleccionarOpcion={(opcion) => onResponder(pregunta.claveInstancia, opcion)}
        />
      ))}
    </div>
  )
}
